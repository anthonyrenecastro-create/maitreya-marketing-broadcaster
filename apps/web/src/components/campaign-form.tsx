"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useCreateCampaign } from "../hooks/use-campaigns";

interface CampaignFormProps {
  orgSlug: string;
}

const AVAILABLE_CHANNELS: string[] = ["linkedin", "x", "instagram", "youtube", "newsletter"];

export function CampaignForm({ orgSlug }: CampaignFormProps): JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [objective, setObjective] = useState<string>("");
  const [channels, setChannels] = useState<string[]>([]);
  const createCampaign = useCreateCampaign(orgSlug);

  const toggleChannel = (channel: string): void => {
    setChannels((current: string[]) =>
      current.includes(channel) ? current.filter((item: string) => item !== channel) : [...current, channel]
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!title || !objective || channels.length === 0) {
      return;
    }

    createCampaign.mutate(
      { title, objective, channels },
      {
        onSuccess: () => {
          setTitle("");
          setObjective("");
          setChannels([]);
        }
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: 12,
        backgroundColor: "var(--panel)",
        border: "1px solid rgba(16, 39, 28, 0.15)",
        borderRadius: 12,
        padding: 16
      }}
    >
      <h3 style={{ margin: 0 }}>New Campaign</h3>
      <input
        value={title}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
        placeholder="Campaign title"
        style={{ padding: 8, borderRadius: 8, border: "1px solid rgba(16, 39, 28, 0.25)" }}
      />
      <textarea
        value={objective}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setObjective(event.target.value)}
        placeholder="Objective"
        rows={2}
        style={{ padding: 8, borderRadius: 8, border: "1px solid rgba(16, 39, 28, 0.25)" }}
      />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {AVAILABLE_CHANNELS.map((channel: string) => (
          <label key={channel} style={{ display: "flex", gap: 4, alignItems: "center", fontSize: "0.9rem" }}>
            <input type="checkbox" checked={channels.includes(channel)} onChange={() => toggleChannel(channel)} />
            {channel}
          </label>
        ))}
      </div>
      <button
        type="submit"
        disabled={createCampaign.isPending}
        style={{
          justifySelf: "start",
          padding: "8px 16px",
          borderRadius: 8,
          border: "none",
          backgroundColor: "var(--accent)",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        {createCampaign.isPending ? "Creating..." : "Create Campaign"}
      </button>
      {createCampaign.isError && <p style={{ color: "#b3261e", margin: 0 }}>Failed to create campaign.</p>}
    </form>
  );
}
