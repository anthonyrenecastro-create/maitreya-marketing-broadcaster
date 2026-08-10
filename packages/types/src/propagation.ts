export enum PropagationStatus {
  QUEUED = "QUEUED",
  PROCESSING = "PROCESSING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED"
}

export interface QueuePropagationRequest {
  organizationId: string;
  projectId: string;
  campaignId: string;
  provider: string;
  contentNodeId: string;
}

export interface QueuePropagationResponse {
  jobId: string;
  status: PropagationStatus;
}
