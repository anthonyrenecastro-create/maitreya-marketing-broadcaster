export enum OrganizationRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER"
}

export interface TenantScopedRequest {
  organizationId: string;
  projectId?: string;
}
