import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { QueuePropagationRequest } from "@maitreya/types";

@Injectable()
export class PropagationProducer {
  private readonly queue: Queue<QueuePropagationRequest>;

  public constructor() {
    this.queue = new Queue<QueuePropagationRequest>("content-propagation", {
      connection: { host: process.env.REDIS_HOST ?? "localhost", port: Number(process.env.REDIS_PORT ?? "6379") }
    });
  }

  public async enqueue(request: QueuePropagationRequest): Promise<string> {
    const job = await this.queue.add("propagate", request, {
      attempts: 3,
      removeOnComplete: 100,
      removeOnFail: 100
    });
    return job.id ?? "";
  }
}
