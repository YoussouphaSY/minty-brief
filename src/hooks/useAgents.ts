import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { agentsService } from '@/services/agentsService';
import type { AgentInsert, AgentUpdate } from '@/types/database.types';

/**
 * Hook pour récupérer tous les agents
 */
export const useAgents = () => {
    return useQuery({
        queryKey: ['agents'],
        queryFn: () => agentsService.getAgents(),
    });
};

/**
 * Hook pour récupérer un agent par son ID
 */
export const useAgent = (id: string | undefined) => {
    return useQuery({
        queryKey: ['agents', id],
        queryFn: () => agentsService.getAgentById(id!),
        enabled: !!id,
    });
};

/**
 * Hook pour récupérer un agent par son matricule
 */
export const useAgentByMatricule = (matricule: string | undefined) => {
    return useQuery({
        queryKey: ['agents', 'matricule', matricule],
        queryFn: () => agentsService.getAgentByMatricule(matricule!),
        enabled: !!matricule,
    });
};

/**
 * Hook pour récupérer les agents par service
 */
export const useAgentsByService = (service: string | undefined) => {
    return useQuery({
        queryKey: ['agents', 'service', service],
        queryFn: () => agentsService.getAgentsByService(service!),
        enabled: !!service,
    });
};

/**
 * Hook pour récupérer les agents par statut
 */
export const useAgentsByStatus = (status: string | undefined) => {
    return useQuery({
        queryKey: ['agents', 'status', status],
        queryFn: () => agentsService.getAgentsByStatus(status!),
        enabled: !!status,
    });
};

/**
 * Hook pour créer un nouvel agent
 */
export const useCreateAgent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (agent: AgentInsert) => agentsService.createAgent(agent),
        onSuccess: () => {
            // Invalider le cache pour forcer un rechargement
            queryClient.invalidateQueries({ queryKey: ['agents'] });
        },
    });
};

/**
 * Hook pour mettre à jour un agent
 */
export const useUpdateAgent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: AgentUpdate }) =>
            agentsService.updateAgent(id, updates),
        onSuccess: (data) => {
            // Invalider le cache pour forcer un rechargement
            queryClient.invalidateQueries({ queryKey: ['agents'] });
            queryClient.invalidateQueries({ queryKey: ['agents', data.id] });
        },
    });
};

/**
 * Hook pour supprimer un agent
 */
export const useDeleteAgent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => agentsService.deleteAgent(id),
        onSuccess: () => {
            // Invalider le cache pour forcer un rechargement
            queryClient.invalidateQueries({ queryKey: ['agents'] });
        },
    });
};
