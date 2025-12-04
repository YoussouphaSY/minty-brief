-- Script pour générer massivement des pointages pour TOUS les agents existants
-- Exécutez ce script dans l'éditeur SQL de Supabase

DO $$
DECLARE
    agent RECORD;
    day_offset INTEGER;
    check_in_time TIMESTAMP;
    check_out_time TIMESTAMP;
    is_weekend BOOLEAN;
    random_status FLOAT;
BEGIN
    -- Pour chaque agent dans la base de données
    FOR agent IN SELECT * FROM agents LOOP
        
        -- Pour chaque jour des 30 derniers jours
        FOR day_offset IN 0..30 LOOP
            
            -- Calculer la date
            check_in_time := CURRENT_DATE - (day_offset || ' days')::INTERVAL;
            
            -- Vérifier si c'est un week-end (0 = Dimanche, 6 = Samedi)
            is_weekend := EXTRACT(DOW FROM check_in_time) IN (0, 6);
            
            -- Si ce n'est pas un week-end, on génère des pointages (avec 90% de chance)
            IF NOT is_weekend AND random() < 0.9 THEN
                
                random_status := random();
                
                IF random_status < 0.05 THEN
                    -- 5% de chance : Absent
                    INSERT INTO pointages (matricule, nom, prenom, service, type_pointage, created_at, liveness_ok)
                    VALUES (agent.matricule, agent.nom, agent.prenom, agent.service, 'Absent', check_in_time + '08:00:00'::TIME, false);
                    
                ELSIF random_status < 0.15 THEN
                    -- 10% de chance : Retard
                    -- Arrivée entre 9h et 10h
                    check_in_time := check_in_time + '09:00:00'::TIME + (random() * interval '60 minutes');
                    
                    INSERT INTO pointages (matricule, nom, prenom, service, type_pointage, created_at, liveness_ok)
                    VALUES (agent.matricule, agent.nom, agent.prenom, agent.service, 'Retard', check_in_time, true);
                    
                    -- Sortie normale
                    check_out_time := check_in_time + interval '8 hours';
                    INSERT INTO pointages (matricule, nom, prenom, service, type_pointage, created_at, liveness_ok)
                    VALUES (agent.matricule, agent.nom, agent.prenom, agent.service, 'sortie', check_out_time, true);
                    
                ELSE
                    -- 85% de chance : Présent (Normal)
                    -- Arrivée entre 7h45 et 8h15
                    check_in_time := check_in_time + '07:45:00'::TIME + (random() * interval '30 minutes');
                    
                    -- Entrée
                    INSERT INTO pointages (matricule, nom, prenom, service, type_pointage, created_at, liveness_ok)
                    VALUES (agent.matricule, agent.nom, agent.prenom, agent.service, 'entrée', check_in_time, true);
                    
                    -- Sortie entre 17h et 18h
                    check_out_time := check_in_time::DATE + '17:00:00'::TIME + (random() * interval '60 minutes');
                    
                    INSERT INTO pointages (matricule, nom, prenom, service, type_pointage, created_at, liveness_ok)
                    VALUES (agent.matricule, agent.nom, agent.prenom, agent.service, 'sortie', check_out_time, true);
                    
                    -- Marquer comme Présent (pour les stats)
                    INSERT INTO pointages (matricule, nom, prenom, service, type_pointage, created_at, liveness_ok)
                    VALUES (agent.matricule, agent.nom, agent.prenom, agent.service, 'Présent', check_in_time, true);
                END IF;
            END IF;
            
        END LOOP;
    END LOOP;
END $$;

-- Vérifier les résultats
SELECT 
    matricule, 
    nom, 
    COUNT(*) as total_pointages,
    COUNT(*) FILTER (WHERE type_pointage = 'Présent') as presents,
    COUNT(*) FILTER (WHERE type_pointage = 'Retard') as retards,
    COUNT(*) FILTER (WHERE type_pointage = 'Absent') as absents
FROM pointages
GROUP BY matricule, nom;
