-- Activer l'extension pgvector pour le support des vecteurs (reconnaissance faciale)
-- Si vous n'utilisez pas la reconnaissance faciale, vous pouvez commenter cette ligne
CREATE EXTENSION IF NOT EXISTS vector;

-- Création de la table agents
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  matricule TEXT NOT NULL UNIQUE,
  service TEXT NOT NULL,
  telephone TEXT,
  photos TEXT[],
  embedding VECTOR(512),  -- Vecteur pour reconnaissance faciale (dimension 512)
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les recherches
CREATE INDEX IF NOT EXISTS idx_agents_matricule ON agents(matricule);
CREATE INDEX IF NOT EXISTS idx_agents_service ON agents(service);
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);

-- Trigger pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON agents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Création de la table pointages
CREATE TABLE IF NOT EXISTS pointages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matricule TEXT NOT NULL,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  service TEXT NOT NULL,
  photo_url TEXT,
  liveness_ok BOOLEAN,
  type_pointage TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE,
  photo TEXT,
  CONSTRAINT fk_pointages_agent FOREIGN KEY (matricule) REFERENCES agents(matricule) ON DELETE CASCADE
);

-- Index pour optimiser les recherches
CREATE INDEX IF NOT EXISTS idx_pointages_matricule ON pointages(matricule);
CREATE INDEX IF NOT EXISTS idx_pointages_created_at ON pointages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pointages_type ON pointages(type_pointage);

-- Création de la table conges
CREATE TABLE IF NOT EXISTS conges (
  id BIGSERIAL PRIMARY KEY,
  agent_id UUID NOT NULL,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  motif TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_conges_agent FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE CASCADE,
  CONSTRAINT check_dates CHECK (date_fin >= date_debut)
);

-- Index pour optimiser les recherches
CREATE INDEX IF NOT EXISTS idx_conges_agent_id ON conges(agent_id);
CREATE INDEX IF NOT EXISTS idx_conges_dates ON conges(date_debut, date_fin);

-- Politiques RLS (Row Level Security)
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE pointages ENABLE ROW LEVEL SECURITY;
ALTER TABLE conges ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture publique (à adapter selon vos besoins)
CREATE POLICY "Enable read access for all users" ON agents
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON pointages
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON conges
  FOR SELECT USING (true);

-- Politique pour permettre l'insertion (à adapter selon vos besoins d'authentification)
CREATE POLICY "Enable insert for authenticated users" ON agents
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users" ON pointages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users" ON conges
  FOR INSERT WITH CHECK (true);

-- Politique pour permettre la mise à jour (à adapter selon vos besoins)
CREATE POLICY "Enable update for authenticated users" ON agents
  FOR UPDATE USING (true);

CREATE POLICY "Enable update for authenticated users" ON pointages
  FOR UPDATE USING (true);

CREATE POLICY "Enable update for authenticated users" ON conges
  FOR UPDATE USING (true);

-- Politique pour permettre la suppression (à adapter selon vos besoins)
CREATE POLICY "Enable delete for authenticated users" ON agents
  FOR DELETE USING (true);

CREATE POLICY "Enable delete for authenticated users" ON pointages
  FOR DELETE USING (true);

CREATE POLICY "Enable delete for authenticated users" ON conges
  FOR DELETE USING (true);
