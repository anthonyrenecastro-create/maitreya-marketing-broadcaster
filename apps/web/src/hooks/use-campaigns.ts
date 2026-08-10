"use client";

import { useMutation, useQuery, useQueryClient, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { CampaignResponse, GenerateCampaignDraftRequest, PropagateCampaignRequest } from "@maitreya/types";

const getCampaigns = async (orgSlug: string): Promise<CampaignResponse[]> => {
  const response = await fetch(`/api/mock/${orgSlug}/campaigns`, { method: "GET" });
  if (!response.ok) {
    throw new Error("Failed to load campaigns");
  }

  return (await response.json()) as CampaignResponse[];
};

export const useCampaigns = (orgSlug: string): UseQueryResult<CampaignResponse[], Error> =>
  useQuery<CampaignResponse[], Error>({
    queryKey: ["campaigns", orgSlug],
    queryFn: () => getCampaigns(orgSlug)
  });

export interface CreateCampaignInput {
  title: string;
  objective: string;
  channels: string[];
}

export const useCreateCampaign = (orgSlug: string): UseMutationResult<CampaignResponse, Error, CreateCampaignInput> => {
  const queryClient = useQueryClient();
  return useMutation<CampaignResponse, Error, CreateCampaignInput>({
    mutationFn: async (input: CreateCampaignInput) => {
      const response = await fetch(`/api/mock/${orgSlug}/campaigns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
      });
      if (!response.ok) {
        throw new Error("Failed to create campaign");
      }

      return (await response.json()) as CampaignResponse;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["campaigns", orgSlug] });
    }
  });
};

export interface GenerateDraftInput {
  campaignId: string;
  intent: string;
  audience: string;
}

export const useGenerateDraft = (orgSlug: string): UseMutationResult<CampaignResponse, Error, GenerateDraftInput> => {
  const queryClient = useQueryClient();
  return useMutation<CampaignResponse, Error, GenerateDraftInput>({
    mutationFn: async ({ campaignId, intent, audience }: GenerateDraftInput) => {
      const payload: GenerateCampaignDraftRequest = { intent, audience };
      const response = await fetch(`/api/mock/${orgSlug}/campaigns/${campaignId}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error("Failed to generate draft");
      }

      return (await response.json()) as CampaignResponse;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["campaigns", orgSlug] });
    }
  });
};

export interface PropagateInput {
  campaignId: string;
  provider: string;
}

export const usePropagateCampaign = (orgSlug: string): UseMutationResult<CampaignResponse, Error, PropagateInput> => {
  const queryClient = useQueryClient();
  return useMutation<CampaignResponse, Error, PropagateInput>({
    mutationFn: async ({ campaignId, provider }: PropagateInput) => {
      const payload: PropagateCampaignRequest = { provider };
      const response = await fetch(`/api/mock/${orgSlug}/campaigns/${campaignId}/propagate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error("Failed to queue propagation");
      }

      return (await response.json()) as CampaignResponse;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["campaigns", orgSlug] });
    }
  });
};

