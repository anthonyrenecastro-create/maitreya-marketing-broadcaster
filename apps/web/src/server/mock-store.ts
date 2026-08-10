import { CampaignResponse, PropagationStatus } from "@maitreya/types";

// Process-memory demo store, scoped per orgSlug to keep tenants isolated.
const store = new Map<string, CampaignResponse[]>();

function seed(orgSlug: string): CampaignResponse[] {
  const now = new Date().toISOString();
  return [
    {
      id: "cmp_demo_01",
      organizationId: `org_${orgSlug}`,
      projectId: "prj_growth",
      title: "Launch Week Multichannel Push",
      objective: "Drive qualified signups from social storytelling and retargeting arcs.",
      channels: ["linkedin", "x", "instagram"],
      createdAt: now
    },
    {
      id: "cmp_demo_02",
      organizationId: `org_${orgSlug}`,
      projectId: "prj_growth",
      title: "Case Study Authority Wave",
      objective: "Amplify proof-based content across B2B communities and newsletters.",
      channels: ["linkedin", "newsletter", "youtube"],
      createdAt: now
    }
  ];
}

function getOrgCampaigns(orgSlug: string): CampaignResponse[] {
  const existing = store.get(orgSlug);
  if (existing) {
    return existing;
  }

  const seeded = seed(orgSlug);
  store.set(orgSlug, seeded);
  return seeded;
}

export interface CreateCampaignInput {
  title: string;
  objective: string;
  channels: string[];
}

export function listCampaigns(orgSlug: string): CampaignResponse[] {
  return getOrgCampaigns(orgSlug);
}

export function createCampaign(orgSlug: string, input: CreateCampaignInput): CampaignResponse {
  const campaign: CampaignResponse = {
    id: `cmp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    organizationId: `org_${orgSlug}`,
    projectId: "prj_growth",
    title: input.title,
    objective: input.objective,
    channels: input.channels,
    createdAt: new Date().toISOString()
  };

  getOrgCampaigns(orgSlug).unshift(campaign);
  return campaign;
}

export function generateDraft(orgSlug: string, campaignId: string, intent: string, audience: string): CampaignResponse {
  // Scoping the lookup to this org's list enforces tenant isolation.
  const campaign = getOrgCampaigns(orgSlug).find((item: CampaignResponse) => item.id === campaignId);
  if (!campaign) {
    throw new Error("Campaign not found");
  }

  campaign.aiDraft = `${campaign.title}: ${intent}. Tailored for ${audience} across ${campaign.channels.join(", ")}.`;
  return campaign;
}

export function propagateCampaign(orgSlug: string, campaignId: string, provider: string): CampaignResponse {
  const campaign = getOrgCampaigns(orgSlug).find((item: CampaignResponse) => item.id === campaignId);
  if (!campaign) {
    throw new Error("Campaign not found");
  }

  campaign.propagationStatus = PropagationStatus.QUEUED;
  setTimeout(() => {
    campaign.propagationStatus = PropagationStatus.SUCCESS;
  }, 1500);

  void provider;
  return campaign;
}
