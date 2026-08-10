export interface PublishPayload {
  organizationId: string;
  projectId: string;
  content: string;
}

export interface PublishResult {
  providerMessageId: string;
  publishedAt: Date;
}

export interface ISocialProvider {
  providerName: string;
  publish(payload: PublishPayload): Promise<PublishResult>;
}
