export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            agents: {
                Row: {
                    id: string
                    nom: string
                    prenom: string
                    matricule: string
                    service: string
                    telephone: string | null
                    photos: string[] | null
                    embedding: number[] | null
                    status: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    nom: string
                    prenom: string
                    matricule: string
                    service: string
                    telephone?: string | null
                    photos?: string[] | null
                    embedding?: number[] | null
                    status?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    nom?: string
                    prenom?: string
                    matricule?: string
                    service?: string
                    telephone?: string | null
                    photos?: string[] | null
                    embedding?: number[] | null
                    status?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            pointages: {
                Row: {
                    id: string
                    matricule: string
                    nom: string
                    prenom: string
                    service: string
                    photo_url: string | null
                    liveness_ok: boolean | null
                    type_pointage: string
                    status: string | null
                    created_at: string
                    timestamp: string | null
                    photo: string | null
                }
                Insert: {
                    id?: string
                    matricule: string
                    nom: string
                    prenom: string
                    service: string
                    photo_url?: string | null
                    liveness_ok?: boolean | null
                    type_pointage: string
                    status?: string | null
                    created_at?: string
                    timestamp?: string | null
                    photo?: string | null
                }
                Update: {
                    id?: string
                    matricule?: string
                    nom?: string
                    prenom?: string
                    service?: string
                    photo_url?: string | null
                    liveness_ok?: boolean | null
                    type_pointage?: string
                    status?: string | null
                    created_at?: string
                    timestamp?: string | null
                    photo?: string | null
                }
            }
            conges: {
                Row: {
                    id: number
                    agent_id: string
                    date_debut: string
                    date_fin: string
                    motif: string | null
                    created_at: string | null
                }
                Insert: {
                    id?: number
                    agent_id: string
                    date_debut: string
                    date_fin: string
                    motif?: string | null
                    created_at?: string | null
                }
                Update: {
                    id?: number
                    agent_id?: string
                    date_debut?: string
                    date_fin?: string
                    motif?: string | null
                    created_at?: string | null
                }
            }
        }
    }
}

// Types utilitaires pour faciliter l'utilisation
export type Agent = Database['public']['Tables']['agents']['Row']
export type AgentInsert = Database['public']['Tables']['agents']['Insert']
export type AgentUpdate = Database['public']['Tables']['agents']['Update']

export type Pointage = Database['public']['Tables']['pointages']['Row']
export type PointageInsert = Database['public']['Tables']['pointages']['Insert']
export type PointageUpdate = Database['public']['Tables']['pointages']['Update']

export type Conge = Database['public']['Tables']['conges']['Row']
export type CongeInsert = Database['public']['Tables']['conges']['Insert']
export type CongeUpdate = Database['public']['Tables']['conges']['Update']
