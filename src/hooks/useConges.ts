import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { congesService, type CongeFilters } from '@/services/congesService';
import type { CongeInsert, CongeUpdate } from '@/types/database.types';

/**
 * Hook pour récupérer tous les congés avec filtres optionnels
 */
export const useConges = (filters?: CongeFilters) => {
    return useQuery({
        queryKey: ['conges', filters],
        queryFn: () => congesService.getConges(filters),
    });
};

/**
 * Hook pour récupérer un congé par son ID
 */
export const useConge = (id: number | undefined) => {
    return useQuery({
        queryKey: ['conges', id],
        queryFn: () => congesService.getCongeById(id!),
        enabled: !!id,
    });
};

/**
 * Hook pour récupérer les congés d'un agent
 */
export const useCongesByAgent = (agentId: string | undefined) => {
    return useQuery({
        queryKey: ['conges', 'agent', agentId],
        queryFn: () => congesService.getCongesByAgent(agentId!),
        enabled: !!agentId,
    });
};

/**
 * Hook pour récupérer les congés en cours
 */
export const useCurrentConges = () => {
    return useQuery({
        queryKey: ['conges', 'current'],
        queryFn: () => congesService.getCurrentConges(),
    });
};

/**
 * Hook pour récupérer les congés à venir
 */
export const useUpcomingConges = (agentId?: string) => {
    return useQuery({
        queryKey: ['conges', 'upcoming', agentId],
        queryFn: () => congesService.getUpcomingConges(agentId),
    });
};

/**
 * Hook pour vérifier si un agent est en congé
 */
export const useIsAgentOnLeave = (agentId: string | undefined, date: string) => {
    return useQuery({
        queryKey: ['conges', 'check', agentId, date],
        queryFn: () => congesService.isAgentOnLeave(agentId!, date),
        enabled: !!agentId && !!date,
    });
};

/**
 * Hook pour créer une nouvelle demande de congé
 */
export const useCreateConge = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (conge: CongeInsert) => congesService.createConge(conge),
        onSuccess: (data) => {
            // Invalider le cache pour forcer un rechargement
            queryClient.invalidateQueries({ queryKey: ['conges'] });
            queryClient.invalidateQueries({
                queryKey: ['conges', 'agent', data.agent_id]
            });
        },
    });
};

/**
 * Hook pour mettre à jour un congé
 */
export const useUpdateConge = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: CongeUpdate }) =>
            congesService.updateConge(id, updates),
        onSuccess: (data) => {
            // Invalider le cache pour forcer un rechargement
            queryClient.invalidateQueries({ queryKey: ['conges'] });
            queryClient.invalidateQueries({ queryKey: ['conges', data.id] });
            queryClient.invalidateQueries({
                queryKey: ['conges', 'agent', data.agent_id]
            });
        },
    });
};

/**
 * Hook pour supprimer un congé
 */
export const useDeleteConge = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => congesService.deleteConge(id),
        onSuccess: () => {
            // Invalider le cache pour forcer un rechargement
            queryClient.invalidateQueries({ queryKey: ['conges'] });
        },
    });
};
