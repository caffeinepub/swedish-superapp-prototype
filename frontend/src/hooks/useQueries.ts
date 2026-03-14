import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Category, LocationRecommendation } from '../backend';

export function useInitialize() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.initialize();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['locationRecommendations'] });
    },
  });
}

export function useCategories() {
  const { actor, isFetching } = useActor();

  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCategory(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Category>({
    queryKey: ['category', id],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getCategory(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useLocationRecommendations(city: string) {
  const { actor, isFetching } = useActor();

  return useQuery<LocationRecommendation>({
    queryKey: ['locationRecommendations', city],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getLocationRecommendations(city);
    },
    enabled: !!actor && !isFetching && !!city,
    staleTime: 1000 * 60 * 10,
  });
}

export function useAllLocationRecommendations() {
  const { actor, isFetching } = useActor();

  return useQuery<LocationRecommendation[]>({
    queryKey: ['allLocationRecommendations'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLocationRecommendations();
    },
    enabled: !!actor && !isFetching,
  });
}
