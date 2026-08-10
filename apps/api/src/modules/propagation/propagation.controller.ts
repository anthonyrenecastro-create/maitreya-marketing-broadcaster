import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { OrganizationRole, QueuePropagationRequest, QueuePropagationResponse } from "@maitreya/types";
import { Roles } from "../../common/decorators/roles.decorator";
import { RolesGuard } from "../../common/guards/roles.guard";
import { PropagationService } from "./propagation.service";

@Controller("propagation")
@UseGuards(RolesGuard)
export class PropagationController {
  public constructor(private readonly propagationService: PropagationService) {}

  @Post("queue")
  @Roles(OrganizationRole.OWNER, OrganizationRole.ADMIN, OrganizationRole.EDITOR)
  public async queue(@Body() payload: QueuePropagationRequest): Promise<QueuePropagationResponse> {
    return this.propagationService.queuePropagation(payload);
  }
}
