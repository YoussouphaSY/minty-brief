import { supabase } from '@/lib/supabaseClient';
import type { Conge, CongeInsert, CongeUpdate } from '@/types/database.types';

export interface CongeFilters {
    agentId?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
}

/**
 * Service pour gérer les opérations sur la table conges
 */
export const congesService = {
    /**
     * Récupérer tous les congés avec filtres optionnels
     */
    async getConges(filters?: CongeFilters): Promise<Conge[]> {
        let query = supabase
            .from('conges')
            .select('*')
            .order('created_at', { ascending: false });

        if (filters?.agentId) {
            query = query.eq('agent_id', filters.agentId);
        }

        if (filters?.startDate) {
            query = query.gte('date_debut', filters.startDate);
        }

        if (filters?.endDate) {
            query = query.lte('date_fin', filters.endDate);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching conges:', error);
            throw error;
        }

        return data || [];
    },

    /**
     * Récupérer un congé par son ID
     */
    async getCongeById(id: number): Promise<Conge | null> {
        const { data, error } = await supabase
            .from('conges')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            console.error('Error fetching conge:', error);
            throw error;
        }

        return data;
    },

    /**
     * Récupérer les congés d'un agent
     */
    async getCongesByAgent(agentId: string): Promise<Conge[]> {
        const { data, error } = await supabase
            .from('conges')
            .select('*')
            .eq('agent_id', agentId)
            .order('date_debut', { ascending: false });

        if (error) {
            console.error('Error fetching conges by agent:', error);
            throw error;
        }

        return data || [];
    },

    /**
     * Créer une nouvelle demande de congé
     */
    async createConge(conge: CongeInsert): Promise<Conge> {
        const { data, error } = await supabase
            .from('conges')
            .insert(conge)
            .select()
            .single();

        if (error) {
            console.error('Error creating conge:', error);
            throw error;
        }

        return data;
    },

    /**
     * Mettre à jour un congé
     */
    async updateConge(id: number, updates: CongeUpdate): Promise<Conge> {
        const { data, error } = await supabase
            .from('conges')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating conge:', error);
            throw error;
        }

        return data;
    },

    /**
     * Supprimer un congé
     */
    async deleteConge(id: number): Promise<void> {
        const { error } = await supabase
            .from('conges')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting conge:', error);
            throw error;
        }
    },

    /**
     * Récupérer les congés en cours (date actuelle entre date_debut et date_fin)
     */
    async getCurrentConges(): Promise<Conge[]> {
        const today = new Date().toISOString().split('T')[0];

        const { data, error } = await supabase
            .from('conges')
            .select('*')
            .lte('date_debut', today)
            .gte('date_fin', today);

        if (error) {
            console.error('Error fetching current conges:', error);
            throw error;
        }

        return data || [];
    },

    /**
     * Récupérer les congés à venir
     */
    async getUpcomingConges(agentId?: string): Promise<Conge[]> {
        const today = new Date().toISOString().split('T')[0];

        let query = supabase
            .from('conges')
            .select('*')
            .gt('date_debut', today)
            .order('date_debut', { ascending: true });

        if (agentId) {
            query = query.eq('agent_id', agentId);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching upcoming conges:', error);
            throw error;
        }

        return data || [];
    },

    /**
     * Vérifier si un agent est en congé à une date donnée
     */
    async isAgentOnLeave(agentId: string, date: string): Promise<boolean> {
        const { data, error } = await supabase
            .from('conges')
            .select('id')
            .eq('agent_id', agentId)
            .lte('date_debut', date)
            .gte('date_fin', date)
            .limit(1);

        if (error) {
            console.error('Error checking agent leave:', error);
            throw error;
        }

        return (data?.length || 0) > 0;
    },
};
