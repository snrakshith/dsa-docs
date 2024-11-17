---
title: "Auth"
description: "Auth"
---

## Axios Configuration

> `path` src\common\utils\axiosUtils.ts

This module configures Axios instances for public and protected API calls, handles token refreshing, and manages user session state.

- It employs JWT for authentication and utilizes local storage to store access and refresh tokens.

#### Dependencies

- `Axios`: Library for making HTTP requests.
- `getElapsedMins`: Utility function to calculate elapsed minutes since a given timestamp.
- `dayjs`: Date library for manipulating and formatting dates.
- `jwt_decode`: Library for decoding JWT tokens.
- `TokenService`: Service for managing user authentication tokens.

#### Constants

- **Headers**:

  - `publicHeaders`: Content type for public requests (form URL encoded).
  - `orgSelectorHeaders`: Content type for organization selection (JSON).
  - `protectedHeadersContent`: Headers for protected content (Excel file download).

- **API Payload**:

  - `payload`: Form data for refreshing access tokens, including `grant_type`, `client_id`, and `refresh_token` retrieved from local storage.

- **Base URLs**:
  - Retrieved from environment variables `REACT_APP_BASE_URL` and `REACT_APP_AUTH_URL`.

#### Axios Instances

1. **Public Axios Instance**:

   - `$axiosPublic`: Configured for public API endpoints with the necessary headers and timeout.

2. **Protected Axios Instance**:
   - `$axiosProtected`: A function that creates an Axios instance with authorization headers.

#### Functions

- **`getRefreshedAccess(payload: string)`**:

  - Sends a request to refresh the access token using the provided payload.
  - Updates local storage with new access and refresh tokens upon success.
  - Redirects to the home page if an error occurs (e.g., invalid token).

- **Axios Interceptors**:

  - **Request Interceptor**:

    - Checks if the access token is present and whether it has expired.
    - If expired, calls `getRefreshedAccess()` to refresh the token and updates the request headers.
    - Validates the remaining session time; if over 45 minutes, redirects the user to the home page.

  - **Error Interceptor**:
    - Removes user tokens and redirects to the home page on request failure.

### Variables

- **`payload`**: The payload used for refreshing access tokens, including grant type, client ID, and the refresh token retrieved from local storage.
- **`authUrl`**: The base URL for authentication endpoints.
- **`baseUrl`**: The base URL for the application’s API.

### Functions

#### `$axiosPublicContentJSON`

```typescript
export const $axiosPublicContentJSON = Axios.create({
  headers: { ...orgSelectorHeaders },
  timeout: 10000,
  baseURL: baseUrl
});
```

- **Description**: Axios instance configured for public content requests with JSON headers.
- **Timeout**: 10 seconds.

#### `$axiosPublic`

```typescript
export const $axiosPublic = Axios.create({
  headers: { ...publicHeaders },
  timeout: 10000,
  baseURL: authUrl
});
```

- **Description**: Axios instance configured for public requests.
- **Timeout**: 10 seconds.

#### `getRefreshedAccess`

```typescript
export const getRefreshedAccess = async (payload: string) => {
  const realmName = JSON.parse(localStorage.getItem("organizationId") || "{}");
  try {
    const resp: any = await $axiosPublic.post(`/realms/${realmName}/protocol/openid-connect/token`, payload);

    //@ts-ignore
    localStorage.setItem("access_token", JSON.stringify(resp.data.access_token));
    //@ts-ignore
    localStorage.setItem("refresh_token", JSON.stringify(resp.data.refresh_token));
  } catch (error) {
    TokenService.removeUser();
    window.location.href = "/";
  }
};
```

- **Parameters**:
  - `payload` (string): The payload containing the refresh token.
- **Description**: Makes a POST request to refresh the access token using the provided payload.
- **Functionality**:
  - Retrieves the organization ID from local storage.
  - If the request succeeds, it stores the new access and refresh tokens in local storage.
  - If it fails, it removes the user and redirects to the homepage.

#### `$axiosProtected`

```typescript
export const $axiosProtected = () => {
  const accessToken = JSON.parse(localStorage.getItem("access_token") || "{}");
  const protectedHeaders = {
    "Content-Type": "application/json;charset=UTF-8",
    "Authorization": `Bearer ${accessToken}`
  };

  // ***************** Axios instance *********
  const instance = Axios.create({
    headers: { ...protectedHeaders },
    timeout: 1000000,
    baseURL: baseUrl
  });

  // **************** Interceptor logic **********
  instance.interceptors.request.use(
    async (config: any) => {
      if (!accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      const user: any = jwt_decode(accessToken);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
      if (!isExpired) {
        return config;
      } else {
        const response: any = await getRefreshedAccess(payload);
        if (response) {
          config.headers.Authorization = `Bearer ${response?.data?.data.token}`;
        }
        const remainingTime = getElapsedMins(JSON.parse(localStorage.getItem("logginSession") || "{}"), new Date().getTime());

        if (remainingTime >= 45) {
          TokenService.removeUser();
          window.location.href = "/";
        }
        localStorage.setItem("logginSession", JSON.stringify(new Date().getTime()));

        return config;
      }
    },
    async function (error) {
      TokenService.removeUser();
      window.location.href = "/";

      return Promise.reject(error);
    }
  );
  return instance;
};
```

- **Description**: Creates an Axios instance for making protected requests that require authorization.
- **Functionality**:
  - Checks if the access token is expired.
  - If expired, it attempts to refresh the access token.
  - If the session has been active for more than 45 minutes, it logs the user out.

### Default Export

```typescript
export default $axiosProtected;
```

- **Description**: Exports the `$axiosProtected` instance as the default export for use in other parts of the application.
