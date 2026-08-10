import { Injectable } from "@nestjs/common";

export interface GeneratePromptRequest {
  organizationId: string;
  projectId: string;
  intent: string;
  audience: string;
}

@Injectable()
export class AiService {
  public async generateDraft(payload: GeneratePromptRequest): Promise<{ draft: string }> {
    const draft = `Intent: ${payload.intent}. Audience: ${payload.audience}.`;
    return { draft };
  }
}
