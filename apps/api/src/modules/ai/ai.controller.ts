import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { OrganizationRole } from "@maitreya/types";
import { Roles } from "../../common/decorators/roles.decorator";
import { RolesGuard } from "../../common/guards/roles.guard";
import { AiService, GeneratePromptRequest } from "./ai.service";

@Controller("ai")
@UseGuards(RolesGuard)
export class AiController {
  public constructor(private readonly aiService: AiService) {}

  @Post("generate")
  @Roles(OrganizationRole.OWNER, OrganizationRole.ADMIN, OrganizationRole.EDITOR)
  public async generateContent(@Body() payload: GeneratePromptRequest): Promise<{ draft: string }> {
    return this.aiService.generateDraft(payload);
  }
}
