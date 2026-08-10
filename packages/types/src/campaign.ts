import { PropagationStatus } from "./propagation";

export interface CreateCampaignRequest {
  organizationId: string;
  projectId: string;
  title: string;
  objective: string;
  channels: string[];
}

export interface CampaignResponse {
  id: string;
  organizationId: string;
  projectId: string;
  title: string;
  objective: string;
  channels: string[];
  createdAt: string;
  aiDraft?: string;
  propagationStatus?: PropagationStatus;
}

export interface GenerateCampaignDraftRequest {
  intent: string;
  audience: string;
}

export interface GenerateCampaignDraftResponse {
  draft: string;
}

export interface PropagateCampaignRequest {
  provider: string;
}

export interface PropagateCampaignResponse {
  jobId: string;
  status: PropagationStatus;
}

