import { CampaignsDashboard } from "../../../components/campaigns-dashboard";

interface CampaignPageProps {
  params: Promise<{
    orgSlug: string;
  }>;
}

export default async function CampaignsPage({ params }: CampaignPageProps): Promise<JSX.Element> {
  const { orgSlug } = await params;
  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "40px 20px" }}>
      <h2>Campaigns for {orgSlug}</h2>
      <CampaignsDashboard orgSlug={orgSlug} />
    </main>
  );
}
