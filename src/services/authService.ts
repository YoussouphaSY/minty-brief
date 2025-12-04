import { supabase } from '@/lib/supabaseClient';
import { agentsService } from './agentsService';
import type { Agent } from '@/types/database.types';

export interface LoginCredentials {
    matricule: string;
    telephone: string;
}

export interface AuthUser {
    agent: Agent;
    isAuthenticated: boolean;
}

/**
 * Service pour gérer l'authentification des agents
 */
export const authService = {
    /**
     * Connexion avec matricule et téléphone
     */
    async login(credentials: LoginCredentials): Promise<AuthUser | null> {
        try {
            // Récupérer l'agent par matricule
            const agent = await agentsService.getAgentByMatricule(credentials.matricule);

            if (!agent) {
                throw new Error('Matricule non trouvé');
            }

            // Vérifier le numéro de téléphone
            if (!agent.telephone) {
                throw new Error('Aucun numéro de téléphone associé à ce matricule');
            }

            // Normaliser les numéros de téléphone pour la comparaison
            const normalizedInputPhone = credentials.telephone.replace(/\s/g, '');
            const normalizedAgentPhone = agent.telephone.replace(/\s/g, '');

            if (normalizedInputPhone !== normalizedAgentPhone) {
                throw new Error('Numéro de téléphone incorrect');
            }

            // Stocker les informations de l'agent dans le localStorage
            const authUser: AuthUser = {
                agent,
                isAuthenticated: true,
            };

            localStorage.setItem('authUser', JSON.stringify(authUser));
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('currentMatricule', agent.matricule);

            return authUser;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    /**
     * Déconnexion
     */
    logout(): void {
        localStorage.removeItem('authUser');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentMatricule');
    },

    /**
     * Récupérer l'utilisateur actuellement connecté
     */
    getCurrentUser(): AuthUser | null {
        const authUserStr = localStorage.getItem('authUser');
        if (!authUserStr) {
            return null;
        }

        try {
            return JSON.parse(authUserStr);
        } catch (error) {
            console.error('Error parsing auth user:', error);
            return null;
        }
    },

    /**
     * Vérifier si l'utilisateur est authentifié
     */
    isAuthenticated(): boolean {
        return localStorage.getItem('isAuthenticated') === 'true';
    },

    /**
     * Récupérer le matricule de l'utilisateur connecté
     */
    getCurrentMatricule(): string | null {
        return localStorage.getItem('currentMatricule');
    },

    /**
     * Rafraîchir les données de l'utilisateur connecté
     */
    async refreshCurrentUser(): Promise<AuthUser | null> {
        const matricule = this.getCurrentMatricule();
        if (!matricule) {
            return null;
        }

        try {
            const agent = await agentsService.getAgentByMatricule(matricule);
            if (!agent) {
                this.logout();
                return null;
            }

            const authUser: AuthUser = {
                agent,
                isAuthenticated: true,
            };

            localStorage.setItem('authUser', JSON.stringify(authUser));
            return authUser;
        } catch (error) {
            console.error('Error refreshing user:', error);
            return null;
        }
    },
};
