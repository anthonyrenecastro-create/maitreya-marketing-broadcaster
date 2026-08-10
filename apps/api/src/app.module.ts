import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AiModule } from "./modules/ai/ai.module";
import { PropagationModule } from "./modules/propagation/propagation.module";
import { SocialModule } from "./modules/social/social.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AiModule, SocialModule, PropagationModule]
})
export class AppModule {}
