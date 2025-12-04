import { supabase } from '@/lib/supabaseClient';
import type { Pointage, PointageInsert, PointageUpdate } from '@/types/database.types';

export interface PointageFilters {
    matricule?: string;
    startDate?: string;
    endDate?: string;
    type?: string;
}

export interface PointageStats {
    presenceRate: number;
    presents: number;
    absents: number;
    lates: number;
    totalDays: number;
}

/**
 * Service pour gérer les opérations sur la table pointages
 */
export const pointagesService = {
    /**
     * Récupérer tous les pointages avec filtres optionnels
     */
    async getPointages(filters?: PointageFilters): Promise<Pointage[]> {
        let query = supabase
            .from('pointages')
            .select('*')
            .order('created_at', { ascending: false });

        if (filters?.matricule) {
            query = query.eq('matricule', filters.matricule);
        }

        if (filters?.startDate) {
            query = query.gte('created_at', filters.startDate);
        }

        if (filters?.endDate) {
            query = query.lte('created_at', filters.endDate);
        }

        if (filters?.type) {
            query = query.eq('type_pointage', filters.type);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching pointages:', error);
            throw error;
        }

        return data || [];
    },

    /**
     * Récupérer les pointages d'un agent par son matricule
     */
    async getPointagesByMatricule(matricule: string): Promise<Pointage[]> {
        const { data, error } = await supabase
            .from('pointages')
            .select('*')
            .eq('matricule', matricule)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching pointages by matricule:', error);
            throw error;
        }

        return data || [];
    },

    /**
     * Créer un nouveau pointage
     */
    async createPointage(pointage: PointageInsert): Promise<Pointage> {
        const { data, error } = await supabase
            .from('pointages')
            .insert(pointage as any)
            .select()
            .single();

        if (error) {
            console.error('Error creating pointage:', error);
            throw error;
        }

        return data;
    },

    /**
     * Mettre à jour un pointage
     */
    async updatePointage(id: string, updates: PointageUpdate): Promise<Pointage> {
        const { data, error } = await supabase
            .from('pointages')
            .update(updates as any)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating pointage:', error);
            throw error;
        }

        return data;
    },

    /**
     * Supprimer un pointage
     */
    async deletePointage(id: string): Promise<void> {
        const { error } = await supabase
            .from('pointages')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting pointage:', error);
            throw error;
        }
    },

    /**
     * Calculer les statistiques de présence pour un agent
     */
    async getPointagesStats(matricule: string, startDate?: string, endDate?: string): Promise<PointageStats> {
        let query = supabase
            .from('pointages')
            .select('type_pointage, status')
            .eq('matricule', matricule);

        if (startDate) {
            query = query.gte('created_at', startDate);
        }

        if (endDate) {
            query = query.lte('created_at', endDate);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching pointages stats:', error);
            throw error;
        }

        const pointages = (data || []) as Array<{ type_pointage: string; status: string | null }>;
        const totalDays = pointages.length;

        // Debug: afficher les statuts pour comprendre les valeurs
        console.log('📊 Pointages récupérés:', pointages.length);
        if (pointages.length > 0) {
            console.log('📋 Exemples de statuts:', pointages.slice(0, 3).map(p => ({
                status: p.status,
                type_pointage: p.type_pointage
            })));
        }

        // Compter les différents types de pointages en utilisant le champ status (avec fallback sur type_pointage)
        // Les statuts dans la base sont en anglais: "validated", "rejected", "pending"
        const presents = pointages.filter(p => {
            const statusField = (p.status || p.type_pointage).toLowerCase();
            return statusField === 'validated' ||  // Validé = Présent
                statusField === 'validé' ||        // Support français aussi
                statusField === 'valide' ||
                statusField === 'présent' ||
                statusField === 'present' ||
                statusField === 'entrée' ||
                statusField === 'entree' ||
                statusField === 'sortie';
        }).length;

        const lates = pointages.filter(p => {
            const statusField = (p.status || p.type_pointage).toLowerCase();
            return statusField === 'pending' ||    // En attente = Retard
                statusField === 'retard';
        }).length;

        const absents = pointages.filter(p => {
            const statusField = (p.status || p.type_pointage).toLowerCase();
            return statusField === 'rejected' ||   // Rejeté = Absent
                statusField === 'absent' ||
                statusField === 'rejeté' ||
                statusField === 'rejete';
        }).length;

        console.log('📈 Statistiques calculées:', { presents, lates, absents, totalDays });

        const presenceRate = totalDays > 0
            ? Math.round(((presents + lates) / totalDays) * 100)
            : 0;

        return {
            presenceRate,
            presents,
            absents,
            lates,
            totalDays,
        };
    },

    /**
     * Récupérer les pointages récents (derniers N jours)
     */
    async getRecentPointages(matricule: string, days: number = 7): Promise<Pointage[]> {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const { data, error } = await supabase
            .from('pointages')
            .select('*')
            .eq('matricule', matricule)
            .gte('created_at', startDate.toISOString())
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching recent pointages:', error);
            throw error;
        }

        return data || [];
    },
};
