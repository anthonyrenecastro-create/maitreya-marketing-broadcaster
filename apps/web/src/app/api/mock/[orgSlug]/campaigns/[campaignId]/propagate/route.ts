import { NextRequest, NextResponse } from "next/server";
import { CampaignResponse, PropagateCampaignRequest } from "@maitreya/types";
import { propagateCampaign } from "../../../../../../../server/mock-store";

interface RouteParams {
  params: Promise<{
    orgSlug: string;
    campaignId: string;
  }>;
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<CampaignResponse | { message: string }>> {
  const { orgSlug, campaignId } = await params;
  const body = (await request.json()) as Partial<PropagateCampaignRequest>;

  if (!body.provider) {
    return NextResponse.json({ message: "provider is required" }, { status: 400 });
  }

  try {
    const campaign = propagateCampaign(orgSlug, campaignId, body.provider);
    return NextResponse.json<CampaignResponse>(campaign);
  } catch {
    return NextResponse.json({ message: "Campaign not found" }, { status: 404 });
  }
}
