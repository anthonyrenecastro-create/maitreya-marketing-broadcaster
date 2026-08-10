import { SetMetadata } from "@nestjs/common";
import { OrganizationRole } from "@maitreya/types";

export const ROLES_KEY = "roles";
export const Roles = (...roles: OrganizationRole[]): ReturnType<typeof SetMetadata> => SetMetadata(ROLES_KEY, roles);
