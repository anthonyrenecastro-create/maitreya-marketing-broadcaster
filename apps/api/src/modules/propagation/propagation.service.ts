import { Injectable } from "@nestjs/common";
import { PropagationStatus, QueuePropagationRequest, QueuePropagationResponse } from "@maitreya/types";
import { PropagationProducer } from "../../queues/producers/propagation.producer";

@Injectable()
export class PropagationService {
  public constructor(private readonly propagationProducer: PropagationProducer) {}

  public async queuePropagation(payload: QueuePropagationRequest): Promise<QueuePropagationResponse> {
    if (!payload.organizationId || !payload.projectId) {
      throw new Error("organizationId and projectId are required for tenant isolation");
    }

    const jobId = await this.propagationProducer.enqueue(payload);
    return {
      jobId,
      status: PropagationStatus.QUEUED
    };
  }
}
