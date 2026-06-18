import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { api } from "@/services/api";
import { useStore } from "@/store/useStore";

export function useLetters() {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: ['letters', i18n.language],
    queryFn: () => api.getLetters(i18n.language)
  });
}

export function useLetterOfDay() {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: ['letterOfDay', i18n.language],
    queryFn: () => api.getLetterOfTheDay(i18n.language)
  });
}

export function useCurrentDraw() {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: ['currentDraw', i18n.language],
    queryFn: () => api.getCurrentDraw(i18n.language)
  });
}

export function useDrawHistory() {
  const { i18n } = useTranslation();
  const { authToken, profileId } = useStore();
  return useQuery({
    queryKey: ['drawHistory', i18n.language, authToken, profileId],
    queryFn: () => api.getDrawHistory(i18n.language, authToken, profileId)
  });
}

export function useCreateDraw() {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();
  return useMutation({
    mutationFn: (variables?: { selectedIds?: number[] }) => 
      api.createDraw(i18n.language, variables?.selectedIds),
    onSuccess: (data) => {
      queryClient.setQueryData(['currentDraw', i18n.language], data);
      queryClient.invalidateQueries({ queryKey: ['drawHistory'] });
    }
  });
}

export function useAddKeywords() {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();
  return useMutation({
    mutationFn: ({ drawId, keywords }: { drawId: number, keywords: string[] }) => 
      api.addKeywordsToDraw(drawId, keywords, i18n.language),
    onSuccess: (data) => {
      queryClient.setQueryData(['currentDraw', i18n.language], data);
      queryClient.invalidateQueries({ queryKey: ['drawHistory'] });
    }
  });
}
