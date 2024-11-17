---
title: "An overview of RBAC usage in whims portal"
description: "An overview of RBAC usage in whims portal"
---

# technical documentation for RBAC

RBAC at many level

- Component level
- Feature level (toggle feature)
- Sidebar level

---

get the logged in user's

- role and org plan
  ex: FM

- access to the modules as well as its sub modules based on the current org plan
  ex: CHW Module , Track CHW Attendance

- his abilities and
  ex: Read

---

Sidebar level - static items - dynamic items based on some special toggle feature which is specific to the facility / Org
ex: Analytics

Component level ( Show and hide ) - we would need a inhouse custom component like <Can /> ( from @casl/ability ) - base on the logged in user role

Feature level
-Based on their access to specific modules ex: doctor module is not visible for fm

---

RBAC for custom roles

1 Create a user group/cohart ex: operations group
2 Attach a policy to that group ex: operations policy

Operations access terms / policy
\*And the terms like this,
CHW Module - CHW Profile
[Y]Create [Y]Read [N]Update [N]Delete

    - Track CHW Attendance
    	[N]Create [Y]Read [N]Update [N]Delete

3 Add a user to a operations group ex: user rahul,rakshith is added to the group

- By default user inherits the abilites/properties of the cohert he is added to

Create a Policy
1 Show all modules and select the modules which needs to be added to a cohart
Ex 1 CHW Module - CHW Profile - Track CHW Attendance

---

> `path` src/rbac

## sidebar/route level

```ts

// src\common\config\routing\RoutesConfig.ts


import { allRoles, permittedRoles } from "../rbac/types/rbac.types";
import { hasAccessToModule, hasAccessToSubModule } from "../../../rbac";
import { Permissions } from "../../../rbac/types";

export default [
    {
        isRoute: true,
        component: DashboardPage,
        path: "/dashboard",
        title: "DashboardPage",
        exact: true,
        permission: [
            permittedRoles.facilityManager,
            permittedRoles.organizationAdmin,
        ],
        canDisplay: hasAccessToModule("DASHBOARD", read),
        children: [],
    },
    {
        isRoute: true,
        component: CHWPage,
        path: "/chw/chw-management",
        title: "CHWPage",
        exact: true,
        permission: allRoles,
        canDisplay: hasAccessToModule("LIST_CHW", read),
        children: [],
    },
    {
        isRoute: true,
        component: CHWOverview,
        path: "/chw/overview",
        title: "CHWOverview",
        permission: allRoles,
        canDisplay: hasAccessToSubModule("LIST_CHW", "CONTAINER_CHW", read),
        children: [],
    },

```

## component level

--- check rbac-component.md

## module level

> Example 1 when dealing with Submodules

```ts
import { allRoles, permittedRoles } from "../rbac/types/rbac.types";
import { hasAccessToModule, hasAccessToSubModule } from "../../../rbac";
import { Permissions } from "../../../rbac/types";

function AttendanceListTable() {
  const canExport = hasAccessToSubModule(
    "LIST_CHW",
    "LIST_ATTENDANCE",
    Permissions.export_button
  );
  return (
    <div>
      <div className="card-toolbar">
        <button
          hidden={!canExport}
          onClick={handleExportModal}
          className="btn btn-sm btn-light-primary me-5"
        >
          <i className="fas fa-download"></i>
          EXPORT
        </button>
      </div>
    </div>
  );
}

export default SampleApp;
```

## Example 2 when dealing with Modules

```ts
import { allRoles, permittedRoles } from "../rbac/types/rbac.types";
import { hasAccessToModule, hasAccessToSubModule } from "../../../rbac";
import { Permissions } from "../../../rbac/types";

function ManagerOnboarding() {
  const cannotSeeOnboardingForm = !hasAccessToModule(
    "ONBOARD_MANAGER",
    Permissions.read
  );
  return (
    <div hidden={cannotSeeOnboardingForm}>
      <p>Some sample text</p>
    </div>
  );
}

export default ManagerOnboarding;
```

## extend RBAC rules

Step 1

- Ask which user role as access to this feature, is it
  admin or facility manager.

- If both can access it than place it as a common resources

- Know its composability ie., export btn, distribute option
  some examples

```ts
export const Composability_Permissions = {
  read: "READ",
  update: "UPDATE",
  create: "CREATE",
  search_bar: "SEARCH_BAR",

  assign_button: "ASSIGN_BUTTON",
  reassign_button: "REASSIGN_BUTTON",
  distribute_button: "DISTRIBUTE_BUTTON",
  export_button: "EXPORT_BUTTON",
  delete_button: "DELETE_BUTTON",
  filter_button: "FILTER_BUTTON",
  detail_button: "DETAIL_BUTTON",

  create_form: "CREATE_FORM",
  view_form: "VIEW_FORM"
};
```

```ts
/**
 *  Logged in User level RBAC
 */
import { Permissions, chwTablePermissions, tablePermissions } from "./types";

const { create, filter_button, export_button, read, search_bar, update } = Permissions;

export const commonResource = {
  roleId: {
    roleName: "FACILITY_MANAGER",
    description: "This role specifies the Admin users"
  },
  platform: "WEB_PORTAL",
  sidebars: [],
  modules: [
    {
      moduleName: "Visulise the insights on various modules",
      identifier: "DASHBOARD",
      submoduleAvailable: false,
      permissions: [read],
      subModules: []
    },
    {
      moduleName: "Report",
      identifier: "LIST_REPORT",
      submoduleAvailable: false,
      permissions: [read, export_button],
      subModules: []
    },
    {
      moduleName: "list of courses",
      identifier: "LIST_COURSE",
      submoduleAvailable: true,
      permissions: [read, search_bar, filter_button],
      subModules: [
        {
          subModuleName: "Container for the Course Overview",
          identifier: "CONTAINER_COURSE",
          permissions: [read]
        },
        {
          subModuleName: "Attach/Modify content to the existing course",
          identifier: "ATTACH_MODIFY_CONTENT",
          permissions: [read, update]
        },
        {
          subModuleName: "See course content",
          identifier: "SEE_COURSE_CONTENT",
          permissions: [read]
        }
      ]
    }
  ]
};
```

Step 2

```ts
export const resource = loggedInUser === "FACILITY_MANAGER" ? fmResource : AdminResource;
```
