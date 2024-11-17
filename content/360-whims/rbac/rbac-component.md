---
title: "An overview of RBAC Component"
description: "An overview of RBAC Component"
---

### Description

The `RBACComponent` is a React component that utilizes Role-Based Access Control (RBAC) to conditionally render its children based on the user's role. It checks if the user has the necessary permissions to view the component's content.

### Imports

```javascript
import { useRBAC } from "../../../../context/RBACContext";
```

- **useRBAC**: A custom hook that provides the current user's role from the RBAC context.

### Type Definitions

#### `RBACComponentTypes`

```typescript
type RBACComponentTypes = {
  children: any;
  whichRoles?: any;
  allRoles?: boolean;
};
```

- **children** (any): The React nodes to be rendered if the user has the appropriate role.
- **whichRoles** (optional, any): An array of roles that are permitted to access the component. If provided, the user's role must match one of these for the children to be rendered.
- **allRoles** (optional, boolean): A flag that, if set to `true`, allows the children to be rendered for all users regardless of their role.

### Component Definition

```typescript
export const RBACComponent = ({
  children,
  whichRoles,
  allRoles = false,
}: RBACComponentTypes) => {
```

#### Parameters

- `children`: The content to be conditionally displayed based on user roles.
- `whichRoles`: An array of roles that are allowed to access the children.
- `allRoles`: A boolean flag indicating whether to render the children for all users.

#### Usage

```javascript
const { userRole } = useRBAC();
```

- Retrieves the current user's role from the RBAC context.

### Render Logic

The component renders its children based on the following conditions:

1. If `whichRoles` is provided:

   - Checks if the `userRole` is included in the `whichRoles` array.
   - If true, it renders the `children`.
   - If false, it renders nothing.

2. If `allRoles` is `true`:
   - Regardless of the user's role, it renders the `children`.

### Example

```javascript
<RBACComponent whichRoles={["facility_manager", "doctor"]} allRoles={false}>
  <div>Protected Content</div>
</RBACComponent>
```

- In this example, the content "Protected Content" will only be displayed if the user's role is either `facility_manager` or `doctor`.

## References:

- `implementation`:

  > src\common\config\rbac\components\RBACComponent.tsx

- `consumed at`:
  > src\pages\supply-chain\indent\indent-details\IndentDetails.tsx
