-- Script d'insertion de données de test pour Supabase
-- Exécutez ce script dans l'éditeur SQL de Supabase

-- ============================================
-- 1. INSERTION D'AGENTS DE TEST
-- ============================================

-- Insérer quelques agents de test
INSERT INTO agents (nom, prenom, matricule, service, telephone, status)
VALUES 
  ('Diop', 'Manga', 'MAT001', 'Sécurité', '77 123 45 67', 'Actif'),
  ('Ndiaye', 'Fatou', 'MAT002', 'Sécurité', '77 234 56 78', 'Actif'),
  ('Sow', 'Ibrahima', 'MAT003', 'Surveillance', '77 345 67 89', 'Actif'),
  ('Fall', 'Aminata', 'MAT004', 'Sécurité', '77 456 78 90', 'Actif'),
  ('Sarr', 'Moussa', 'MAT005', 'Surveillance', '77 567 89 01', 'Actif')
ON CONFLICT (matricule) DO NOTHING;

-- ============================================
-- 2. INSERTION DE POINTAGES DE TEST
-- ============================================

-- Pointages pour MAT001 (Manga Diop) - Derniers 30 jours
INSERT INTO pointages (matricule, nom, prenom, service, type_pointage, created_at, liveness_ok)
VALUES 
  -- Aujourd'hui
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'entrée', NOW(), true),
  
  -- Hier
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'entrée', NOW() - INTERVAL '1 day' + INTERVAL '8 hours', true),
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'sortie', NOW() - INTERVAL '1 day' + INTERVAL '17 hours', true),
  
  -- Il y a 2 jours
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'entrée', NOW() - INTERVAL '2 days' + INTERVAL '8 hours 15 minutes', true),
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'sortie', NOW() - INTERVAL '2 days' + INTERVAL '17 hours 5 minutes', true),
  
  -- Il y a 3 jours - Retard
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'Retard', NOW() - INTERVAL '3 days' + INTERVAL '8 hours 45 minutes', true),
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'sortie', NOW() - INTERVAL '3 days' + INTERVAL '17 hours', true),
  
  -- Il y a 4 jours
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'entrée', NOW() - INTERVAL '4 days' + INTERVAL '7 hours 55 minutes', true),
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'sortie', NOW() - INTERVAL '4 days' + INTERVAL '16 hours 50 minutes', true),
  
  -- Il y a 5 jours
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'entrée', NOW() - INTERVAL '5 days' + INTERVAL '8 hours 10 minutes', true),
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'sortie', NOW() - INTERVAL '5 days' + INTERVAL '17 hours 15 minutes', true),
  
  -- Il y a 6 jours - Absent
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'Absent', NOW() - INTERVAL '6 days' + INTERVAL '8 hours', false),
  
  -- Il y a 7 jours
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'entrée', NOW() - INTERVAL '7 days' + INTERVAL '8 hours 5 minutes', true),
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'sortie', NOW() - INTERVAL '7 days' + INTERVAL '17 hours', true),
  
  -- Il y a 8 jours
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'entrée', NOW() - INTERVAL '8 days' + INTERVAL '8 hours', true),
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'sortie', NOW() - INTERVAL '8 days' + INTERVAL '17 hours 10 minutes', true),
  
  -- Il y a 9 jours - Retard
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'Retard', NOW() - INTERVAL '9 days' + INTERVAL '9 hours', true),
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'sortie', NOW() - INTERVAL '9 days' + INTERVAL '17 hours', true),
  
  -- Il y a 10 jours
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'entrée', NOW() - INTERVAL '10 days' + INTERVAL '8 hours 3 minutes', true),
  ('MAT001', 'Diop', 'Manga', 'Sécurité', 'sortie', NOW() - INTERVAL '10 days' + INTERVAL '17 hours 8 minutes', true);

-- Pointages pour MAT002 (Fatou Ndiaye) - Derniers 7 jours
INSERT INTO pointages (matricule, nom, prenom, service, type_pointage, created_at, liveness_ok)
VALUES 
  -- Aujourd'hui
  ('MAT002', 'Ndiaye', 'Fatou', 'Sécurité', 'entrée', NOW(), true),
  
  -- Hier
  ('MAT002', 'Ndiaye', 'Fatou', 'Sécurité', 'entrée', NOW() - INTERVAL '1 day' + INTERVAL '8 hours 10 minutes', true),
  ('MAT002', 'Ndiaye', 'Fatou', 'Sécurité', 'sortie', NOW() - INTERVAL '1 day' + INTERVAL '17 hours', true),
  
  -- Il y a 2 jours
  ('MAT002', 'Ndiaye', 'Fatou', 'Sécurité', 'entrée', NOW() - INTERVAL '2 days' + INTERVAL '8 hours', true),
  ('MAT002', 'Ndiaye', 'Fatou', 'Sécurité', 'sortie', NOW() - INTERVAL '2 days' + INTERVAL '17 hours', true),
  
  -- Il y a 3 jours
  ('MAT002', 'Ndiaye', 'Fatou', 'Sécurité', 'entrée', NOW() - INTERVAL '3 days' + INTERVAL '8 hours 5 minutes', true),
  ('MAT002', 'Ndiaye', 'Fatou', 'Sécurité', 'sortie', NOW() - INTERVAL '3 days' + INTERVAL '17 hours 10 minutes', true),
  
  -- Il y a 4 jours - Retard
  ('MAT002', 'Ndiaye', 'Fatou', 'Sécurité', 'Retard', NOW() - INTERVAL '4 days' + INTERVAL '8 hours 50 minutes', true),
  ('MAT002', 'Ndiaye', 'Fatou', 'Sécurité', 'sortie', NOW() - INTERVAL '4 days' + INTERVAL '17 hours', true);

-- Pointages pour MAT003 (Ibrahima Sow) - Derniers 5 jours
INSERT INTO pointages (matricule, nom, prenom, service, type_pointage, created_at, liveness_ok)
VALUES 
  -- Aujourd'hui
  ('MAT003', 'Sow', 'Ibrahima', 'Surveillance', 'entrée', NOW(), true),
  
  -- Hier
  ('MAT003', 'Sow', 'Ibrahima', 'Surveillance', 'entrée', NOW() - INTERVAL '1 day' + INTERVAL '8 hours', true),
  ('MAT003', 'Sow', 'Ibrahima', 'Surveillance', 'sortie', NOW() - INTERVAL '1 day' + INTERVAL '17 hours', true),
  
  -- Il y a 2 jours - Absent
  ('MAT003', 'Sow', 'Ibrahima', 'Surveillance', 'Absent', NOW() - INTERVAL '2 days' + INTERVAL '8 hours', false),
  
  -- Il y a 3 jours
  ('MAT003', 'Sow', 'Ibrahima', 'Surveillance', 'entrée', NOW() - INTERVAL '3 days' + INTERVAL '8 hours', true),
  ('MAT003', 'Sow', 'Ibrahima', 'Surveillance', 'sortie', NOW() - INTERVAL '3 days' + INTERVAL '17 hours', true);

-- ============================================
-- 3. INSERTION DE CONGÉS DE TEST
-- ============================================

-- Récupérer les IDs des agents pour les congés
-- Note: Vous devrez peut-être ajuster ces IDs selon votre base de données

-- Congés pour MAT001
INSERT INTO conges (agent_id, date_debut, date_fin, motif)
SELECT 
  id,
  CURRENT_DATE + INTERVAL '15 days',
  CURRENT_DATE + INTERVAL '20 days',
  'Congés annuels'
FROM agents WHERE matricule = 'MAT001';

-- Congés pour MAT002
INSERT INTO conges (agent_id, date_debut, date_fin, motif)
SELECT 
  id,
  CURRENT_DATE - INTERVAL '10 days',
  CURRENT_DATE - INTERVAL '5 days',
  'Congé maladie'
FROM agents WHERE matricule = 'MAT002';

-- Congés pour MAT003
INSERT INTO conges (agent_id, date_debut, date_fin, motif)
SELECT 
  id,
  CURRENT_DATE + INTERVAL '30 days',
  CURRENT_DATE + INTERVAL '45 days',
  'Congés annuels'
FROM agents WHERE matricule = 'MAT003';

-- ============================================
-- 4. VÉRIFICATION DES DONNÉES INSÉRÉES
-- ============================================

-- Compter les agents
SELECT COUNT(*) as total_agents FROM agents;

-- Compter les pointages par agent
SELECT matricule, nom, prenom, COUNT(*) as total_pointages
FROM pointages
GROUP BY matricule, nom, prenom
ORDER BY matricule;

-- Compter les pointages par type
SELECT type_pointage, COUNT(*) as total
FROM pointages
GROUP BY type_pointage
ORDER BY total DESC;

-- Voir les congés
SELECT 
  a.matricule,
  a.nom,
  a.prenom,
  c.date_debut,
  c.date_fin,
  c.motif
FROM conges c
JOIN agents a ON c.agent_id = a.id
ORDER BY c.date_debut;

-- Voir les derniers pointages
SELECT 
  matricule,
  nom,
  prenom,
  type_pointage,
  created_at
FROM pointages
ORDER BY created_at DESC
LIMIT 20;
