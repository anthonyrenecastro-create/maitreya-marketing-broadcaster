"use client";

import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { CampaignResponse } from "@maitreya/types";
import { useCampaigns, useGenerateDraft, usePropagateCampaign } from "../hooks/use-campaigns";
import { CampaignForm } from "./campaign-form";

interface CampaignsDashboardProps {
  orgSlug: string;
}

const PROVIDERS: string[] = ["linkedin", "x", "instagram", "youtube", "newsletter"];

export function CampaignsDashboard({ orgSlug }: CampaignsDashboardProps): JSX.Element {
  const { data, isLoading, isError } = useCampaigns(orgSlug);
  const generateDraft = useGenerateDraft(orgSlug);
  const propagateCampaign = usePropagateCampaign(orgSlug);
  const [providerByCampaign, setProviderByCampaign] = useState<Record<string, string>>({});

  return (
    <section style={{ display: "grid", gap: 24 }}>
      <CampaignForm orgSlug={orgSlug} />

      {isLoading && <p>Loading campaigns...</p>}
      {isError && <p>Unable to load campaigns.</p>}

      {data && (
        <div style={{ display: "grid", gap: 16 }}>
          {data.map((campaign: CampaignResponse, index: number) => {
            const selectedProvider = providerByCampaign[campaign.id] ?? PROVIDERS[0];

            return (
              <motion.article
                key={campaign.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                style={{
                  backgroundColor: "var(--panel)",
                  border: "1px solid rgba(16, 39, 28, 0.15)",
                  borderRadius: 12,
                  padding: 16,
                  display: "grid",
                  gap: 8
                }}
              >
                <h3 style={{ margin: 0 }}>{campaign.title}</h3>
                <p style={{ margin: 0 }}>{campaign.objective}</p>
                <p style={{ margin: 0, opacity: 0.7 }}>Channels: {campaign.channels.join(", ")}</p>

                {campaign.aiDraft && (
                  <p style={{ margin: 0, padding: 8, backgroundColor: "rgba(206, 107, 44, 0.12)", borderRadius: 8 }}>
                    Draft: {campaign.aiDraft}
                  </p>
                )}

                {campaign.propagationStatus && (
                  <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.75 }}>
                    Propagation status: {campaign.propagationStatus}
                  </p>
                )}

                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() =>
                      generateDraft.mutate({
                        campaignId: campaign.id,
                        intent: campaign.objective,
                        audience: "target audience"
                      })
                    }
                    disabled={generateDraft.isPending}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 8,
                      border: "1px solid rgba(16, 39, 28, 0.25)",
                      cursor: "pointer",
                      backgroundColor: "transparent"
                    }}
                  >
                    {generateDraft.isPending ? "Generating..." : "Generate AI Draft"}
                  </button>

                  <select
                    value={selectedProvider}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                      setProviderByCampaign((current: Record<string, string>) => ({
                        ...current,
                        [campaign.id]: event.target.value
                      }))
                    }
                    style={{ padding: 6, borderRadius: 8, border: "1px solid rgba(16, 39, 28, 0.25)" }}
                  >
                    {PROVIDERS.map((item: string) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => propagateCampaign.mutate({ campaignId: campaign.id, provider: selectedProvider })}
                    disabled={propagateCampaign.isPending}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 8,
                      border: "none",
                      backgroundColor: "var(--accent)",
                      color: "#fff",
                      cursor: "pointer"
                    }}
                  >
                    {propagateCampaign.isPending ? "Queuing..." : "Propagate"}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </section>
  );
}

