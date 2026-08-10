import { Injectable, NotFoundException } from "@nestjs/common";
import { ISocialProvider } from "../../common/interfaces/social-provider.interface";

@Injectable()
export class SocialService {
  private readonly providers: Map<string, ISocialProvider> = new Map<string, ISocialProvider>();

  public registerProvider(provider: ISocialProvider): void {
    this.providers.set(provider.providerName, provider);
  }

  public getProvider(providerName: string): ISocialProvider {
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new NotFoundException(`Provider ${providerName} is not registered`);
    }

    return provider;
  }
}
