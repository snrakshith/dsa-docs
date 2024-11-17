// ## Documentation for RBAC types

// Permissions module defining constants for various user actions and controls.
export const Permissions = {
  read: "READ",
  update: "UPDATE",
  create: "CREATE",
  search_bar: "SEARCH_BAR",

  // Button permissions
  assign_button: "ASSIGN_BUTTON",
  reassign_button: "REASSIGN_BUTTON",
  distribute_button: "DISTRIBUTE_BUTTON",
  export_button: "EXPORT_BUTTON",
  delete_button: "DELETE_BUTTON",
  filter_button: "FILTER_BUTTON",
  detail_button: "DETAIL_BUTTON",

  // Form permissions
  create_form: "CREATE_FORM",
  view_form: "VIEW_FORM",
};

// Define types for various permissions a user can have.
export type IPermission =
  | "READ"
  | "WRITE"
  | "UPDATE"
  | "DELETE"
  | "EXPORT"
  | "CREATE";

// Define types for modules in the application.
export type IModules =
  | "DASHBOARD"
  | "SETTINGS"
  | "PERFORMANCE_MONITORING"
  | "LIST_REPORT"
  | "CREATE_COURSE"
  | "CREATE_CATEGORY_SUBCATEGORY"
  | "LIST_CATEGORY_SUBCATEGORY"
  | "INSIGHTS_TASK"
  | "LIST_COURSE"
  | "LIST_FACILITY";

// Subtype definitions for different modules to categorize specific functionalities.
type Subtypes = {
  Dashboard: "CHARTS" | "TABLES";
  Settings: "USER" | "APP";
  CHW: "CONTAINER_CHW" | "LIST_ATTENDANCE" | "TASK_LIST";
  Doctor: "CONTAINER_DOCTOR" | "LIST_APPOINTMENT";
  Patient:
    | "CONTAINER_PATIENT"
    | "LIST_PATIENT_APPOINTMENT"
    | "LIST_ASSIGNED_FOCUSED_GROUPS";
  HealthCard: "CONTAINER_BATCH" | "LIST_HEALTHCARDS";
  Task: "CONTAINER_TASK";
  Training: "CONTAINER_COURSE";
  FocusedGroup:
    | "CONTAINER_FOCUSED_GROUP"
    | "LIST_FORM_ENTRIES"
    | "LIST_BENEFICIARY_VITALS"
    | "LIST_BENEFICIARY_ENTRIES"
    | "LIST_FORMS";
  Indent: "MODIFY_INDENT" | "INDENT_DETAILS" | "CREATE_PURCHASE_ORDER";
};

// MainType represents the application's main modules.
export type MainType = IModules;

// SubType dynamically maps main modules to their respective subtypes.
export type SubType<Main extends IModules> = Main extends keyof Subtypes
  ? Subtypes[Main] // If it matches a key in Subtypes, return the corresponding subtypes
  : never;

// Destructure the Permissions object for easier access to specific permissions.
const {
  distribute_button,
  filter_button,
  detail_button,
  assign_button,
  create,
  create_form,
  delete_button,
  export_button,
  read,
  reassign_button,
  search_bar,
  update,
  view_form,
} = Permissions;

// Default actions initialized as an empty array.
export const defaultActions = [];

// Table-specific permissions for general actions.
export const tablePermissions = [
  read,
  search_bar,
  export_button,
  filter_button,
  detail_button,
];

// Additional permissions for the CHW table, including more specific actions.
export const chwTablePermissions = [
  read,
  search_bar,
  export_button,
  filter_button,
  detail_button,
  distribute_button,
  reassign_button,
  delete_button,
];
