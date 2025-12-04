import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pointagesService, type PointageFilters } from '@/services/pointagesService';
import type { PointageInsert, PointageUpdate } from '@/types/database.types';

/**
 * Hook pour récupérer tous les pointages avec filtres optionnels
 */
export const usePointages = (filters?: PointageFilters) => {
    return useQuery({
        queryKey: ['pointages', filters],
        queryFn: () => pointagesService.getPointages(filters),
    });
};

/**
 * Hook pour récupérer les pointages d'un agent par matricule
 */
export const usePointagesByMatricule = (matricule: string | undefined) => {
    return useQuery({
        queryKey: ['pointages', 'matricule', matricule],
        queryFn: () => pointagesService.getPointagesByMatricule(matricule!),
        enabled: !!matricule,
    });
};

/**
 * Hook pour récupérer les pointages récents d'un agent
 */
export const useRecentPointages = (matricule: string | undefined, days: number = 7) => {
    return useQuery({
        queryKey: ['pointages', 'recent', matricule, days],
        queryFn: () => pointagesService.getRecentPointages(matricule!, days),
        enabled: !!matricule,
    });
};

/**
 * Hook pour récupérer les statistiques de présence d'un agent
 */
export const usePointagesStats = (
    matricule: string | undefined,
    startDate?: string,
    endDate?: string
) => {
    return useQuery({
        queryKey: ['pointages', 'stats', matricule, startDate, endDate],
        queryFn: () => pointagesService.getPointagesStats(matricule!, startDate, endDate),
        enabled: !!matricule,
    });
};

/**
 * Hook pour créer un nouveau pointage
 */
export const useCreatePointage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (pointage: PointageInsert) => pointagesService.createPointage(pointage),
        onSuccess: (data) => {
            // Invalider le cache pour forcer un rechargement
            queryClient.invalidateQueries({ queryKey: ['pointages'] });
            queryClient.invalidateQueries({
                queryKey: ['pointages', 'matricule', data.matricule]
            });
            queryClient.invalidateQueries({
                queryKey: ['pointages', 'stats', data.matricule]
            });
        },
    });
};

/**
 * Hook pour mettre à jour un pointage
 */
export const useUpdatePointage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: PointageUpdate }) =>
            pointagesService.updatePointage(id, updates),
        onSuccess: (data) => {
            // Invalider le cache pour forcer un rechargement
            queryClient.invalidateQueries({ queryKey: ['pointages'] });
            queryClient.invalidateQueries({
                queryKey: ['pointages', 'matricule', data.matricule]
            });
            queryClient.invalidateQueries({
                queryKey: ['pointages', 'stats', data.matricule]
            });
        },
    });
};

/**
 * Hook pour supprimer un pointage
 */
export const useDeletePointage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => pointagesService.deletePointage(id),
        onSuccess: () => {
            // Invalider le cache pour forcer un rechargement
            queryClient.invalidateQueries({ queryKey: ['pointages'] });
        },
    });
};
