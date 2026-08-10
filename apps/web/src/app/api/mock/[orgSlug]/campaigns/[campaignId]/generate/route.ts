import { NextRequest, NextResponse } from "next/server";
import { CampaignResponse, GenerateCampaignDraftRequest } from "@maitreya/types";
import { generateDraft } from "../../../../../../../server/mock-store";

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
  const body = (await request.json()) as Partial<GenerateCampaignDraftRequest>;

  if (!body.intent || !body.audience) {
    return NextResponse.json({ message: "intent and audience are required" }, { status: 400 });
  }

  try {
    const campaign = generateDraft(orgSlug, campaignId, body.intent, body.audience);
    return NextResponse.json<CampaignResponse>(campaign);
  } catch {
    return NextResponse.json({ message: "Campaign not found" }, { status: 404 });
  }
}
