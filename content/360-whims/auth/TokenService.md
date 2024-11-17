---
title: "Token Management"
description: "Token Management"
---

> **File Path**: `src/common/utils/TokenService.ts`

### Description

The `TokenService` module provides functionality for managing user authentication tokens in the browser's local storage. It primarily includes a method to remove user-related data upon logout or session expiration.

### Functions

#### `removeUser`

```typescript
const removeUser = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("status");
  localStorage.removeItem("logginSession");
  localStorage.removeItem("facilityName");
  localStorage.removeItem("facilityCode");
  localStorage.removeItem("photo");
  localStorage.removeItem("userRole");
  localStorage.removeItem("facilityStatus");
};
```

- **Description**: Removes all user-related data from local storage. This is typically called during user logout or when the session is no longer valid.
- **Local Storage Items Removed**:
  - `access_token`: The user's access token used for authenticating API requests.
  - `refresh_token`: The token used to obtain new access tokens when the current one expires.
  - `status`: The current status of the user session.
  - `logginSession`: Information related to the user's login session.
  - `facilityName`: The name of the facility associated with the user.
  - `facilityCode`: The code identifying the user's facility.
  - `photo`: The URL or path to the user's profile photo.
  - `userRole`: The role assigned to the user, which may determine access rights.
  - `facilityStatus`: The operational status of the facility.

### Exported Components

```typescript
const TokenService = {
  removeUser
};
```

- **Description**: Exports the `TokenService` object, which includes the `removeUser` function for use in other parts of the application.

### Default Export

```typescript
export default TokenService;
```

- **Description**: Exports the `TokenService` module as the default export, allowing easy integration into other components that require token management functionality.
