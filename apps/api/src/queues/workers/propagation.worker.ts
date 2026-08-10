import { Job, Worker } from "bullmq";
import { QueuePropagationRequest } from "@maitreya/types";

const worker = new Worker<QueuePropagationRequest>(
  "content-propagation",
  async (job: Job<QueuePropagationRequest>): Promise<void> => {
    const { organizationId, projectId, campaignId, provider } = job.data;
    if (!organizationId || !projectId || !campaignId || !provider) {
      throw new Error("Tenant-safe propagation data is required");
    }

    // Placeholder for provider-specific publish flow.
  },
  {
    connection: { host: process.env.REDIS_HOST ?? "localhost", port: Number(process.env.REDIS_PORT ?? "6379") }
  }
);

worker.on("failed", (job: Job<QueuePropagationRequest> | undefined, error: Error) => {
  if (job) {
    console.error(`Propagation failed for ${job.id}: ${error.message}`);
  }
});
