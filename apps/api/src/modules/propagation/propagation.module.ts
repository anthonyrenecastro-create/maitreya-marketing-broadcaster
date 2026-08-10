import { Module } from "@nestjs/common";
import { PropagationController } from "./propagation.controller";
import { PropagationService } from "./propagation.service";
import { PropagationProducer } from "../../queues/producers/propagation.producer";

@Module({
  controllers: [PropagationController],
  providers: [PropagationService, PropagationProducer],
  exports: [PropagationService]
})
export class PropagationModule {}
