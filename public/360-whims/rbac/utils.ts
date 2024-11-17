import { resource } from "./schema";
import { IModules, MainType, SubType } from "./types";

export function hasAccessToModule(identifier: IModules, permission: any) {
  const module = resource.modules.find((m) => m.identifier === identifier);

  if (!module) {
    return false;
  }

  const permissions = module.permissions;

  return permissions.includes(permission);
}

export function hasAccessToSubModule<Main extends MainType>(
  identifier: Main,
  submoduleIdentifier: SubType<Main>,
  requiredPermission: any
) {
  // Find the submodule with the given identifier
  const obj = resource.modules.find(
    (module: any) => module.identifier === identifier
  );
  if (obj) {
    const res = obj.subModules.find(
      (submodule) => submodule.identifier === submoduleIdentifier
    );
    // Check if the required permission is present in the submodule's permissions
    if (res?.permissions.includes(requiredPermission)) {
      return true;
    }
  }

  return false;
}
