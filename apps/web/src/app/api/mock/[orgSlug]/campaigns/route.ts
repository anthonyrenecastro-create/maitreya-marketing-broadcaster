import { NextRequest, NextResponse } from "next/server";
import { CampaignResponse } from "@maitreya/types";
import { createCampaign, CreateCampaignInput, listCampaigns } from "../../../../../server/mock-store";

interface RouteParams {
  params: Promise<{
    orgSlug: string;
  }>;
}

export async function GET(_: Request, { params }: RouteParams): Promise<NextResponse<CampaignResponse[]>> {
  const { orgSlug } = await params;
  return NextResponse.json<CampaignResponse[]>(listCampaigns(orgSlug));
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<CampaignResponse | { message: string }>> {
  const { orgSlug } = await params;
  const body = (await request.json()) as Partial<CreateCampaignInput>;

  if (!body.title || !body.objective || !Array.isArray(body.channels) || body.channels.length === 0) {
    return NextResponse.json({ message: "title, objective, and at least one channel are required" }, { status: 400 });
  }

  const campaign = createCampaign(orgSlug, { title: body.title, objective: body.objective, channels: body.channels });
  return NextResponse.json<CampaignResponse>(campaign, { status: 201 });
}
