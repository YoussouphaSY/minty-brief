import { supabase } from '@/lib/supabaseClient';
import type { Agent, AgentInsert, AgentUpdate } from '@/types/database.types';

/**
 * Service pour gérer les opérations CRUD sur la table agents
 */
export const agentsService = {
    /**
     * Récupérer tous les agents
     */
    async getAgents(): Promise<Agent[]> {
        const { data, error } = await supabase
            .from('agents')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching agents:', error);
            throw error;
        }

        return data || [];
    },

    /**
     * Récupérer un agent par son ID
     */
    async getAgentById(id: string): Promise<Agent | null> {
        const { data, error } = await supabase
            .from('agents')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching agent:', error);
            throw error;
        }

        return data;
    },

    /**
     * Récupérer un agent par son matricule
     */
    async getAgentByMatricule(matricule: string): Promise<Agent | null> {
        const { data, error } = await supabase
            .from('agents')
            .select('*')
            .eq('matricule', matricule)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                // Aucun résultat trouvé
                return null;
            }
            console.error('Error fetching agent by matricule:', error);
            throw error;
        }

        return data;
    },

    /**
     * Créer un nouvel agent
     */
    async createAgent(agent: AgentInsert): Promise<Agent> {
        const { data, error } = await supabase
            .from('agents')
            .insert(agent)
            .select()
            .single();

        if (error) {
            console.error('Error creating agent:', error);
            throw error;
        }

        return data;
    },

    /**
     * Mettre à jour un agent
     */
    async updateAgent(id: string, updates: AgentUpdate): Promise<Agent> {
        const { data, error } = await supabase
            .from('agents')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating agent:', error);
            throw error;
        }

        return data;
    },

    /**
     * Supprimer un agent
     */
    async deleteAgent(id: string): Promise<void> {
        const { error } = await supabase
            .from('agents')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting agent:', error);
            throw error;
        }
    },

    /**
     * Rechercher des agents par service
     */
    async getAgentsByService(service: string): Promise<Agent[]> {
        const { data, error } = await supabase
            .from('agents')
            .select('*')
            .eq('service', service)
            .order('nom', { ascending: true });

        if (error) {
            console.error('Error fetching agents by service:', error);
            throw error;
        }

        return data || [];
    },

    /**
     * Rechercher des agents par statut
     */
    async getAgentsByStatus(status: string): Promise<Agent[]> {
        const { data, error } = await supabase
            .from('agents')
            .select('*')
            .eq('status', status)
            .order('nom', { ascending: true });

        if (error) {
            console.error('Error fetching agents by status:', error);
            throw error;
        }

        return data || [];
    },
};
