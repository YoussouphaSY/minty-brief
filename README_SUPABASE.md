# Guide d'Intégration Supabase - Minty-Brief

Ce document explique comment configurer et utiliser Supabase dans l'application Minty-Brief.

## Table des Matières

1. [Configuration Initiale](#configuration-initiale)
2. [Structure de la Base de Données](#structure-de-la-base-de-données)
3. [Utilisation des Services](#utilisation-des-services)
4. [Utilisation des Hooks React Query](#utilisation-des-hooks-react-query)
5. [Exemples de Code](#exemples-de-code)
6. [Bonnes Pratiques](#bonnes-pratiques)

## Configuration Initiale

### 1. Créer un Projet Supabase

1. Rendez-vous sur [supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Créez un nouveau projet
4. Notez l'URL du projet et la clé publique (anon key)

### 2. Configurer les Variables d'Environnement

Copiez le fichier `.env.example` vers `.env.local` :

```bash
cp .env.example .env.local
```

Modifiez `.env.local` avec vos credentials Supabase :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-cle-publique-ici
```

> [!IMPORTANT]
> Ne committez jamais le fichier `.env.local` dans Git. Il est déjà dans `.gitignore`.

### 3. Créer le Schéma de Base de Données

1. Ouvrez le dashboard Supabase de votre projet
2. Allez dans l'éditeur SQL (SQL Editor)
3. Copiez le contenu du fichier [supabase/schema.sql](file:///home/exemplesy/Bureau/Manguifi/minty-brief/supabase/schema.sql)
4. Collez-le dans l'éditeur SQL et exécutez

Cela créera les trois tables :
- `agents`
- `pointages`
- `conges`

### 4. Installer les Dépendances

Les dépendances sont déjà installées. Si nécessaire :

```bash
npm install @supabase/supabase-js
```

## Structure de la Base de Données

### Table `agents`

Stocke les informations des agents de sécurité.

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Identifiant unique (clé primaire) |
| `nom` | TEXT | Nom de famille |
| `prenom` | TEXT | Prénom |
| `matricule` | TEXT | Matricule unique |
| `service` | TEXT | Service d'affectation |
| `telephone` | TEXT | Numéro de téléphone (optionnel) |
| `photos` | TEXT[] | URLs des photos (optionnel) |
| `embedding` | VECTOR | Vecteur pour reconnaissance faciale (optionnel) |
| `status` | TEXT | Statut de l'agent (optionnel) |
| `created_at` | TIMESTAMPTZ | Date de création |
| `updated_at` | TIMESTAMPTZ | Date de dernière modification |

### Table `pointages`

Enregistre les pointages (entrées/sorties) des agents.

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | Identifiant unique (clé primaire) |
| `matricule` | TEXT | Matricule de l'agent (clé étrangère) |
| `nom` | TEXT | Nom de l'agent |
| `prenom` | TEXT | Prénom de l'agent |
| `service` | TEXT | Service de l'agent |
| `photo_url` | TEXT | URL de la photo du pointage (optionnel) |
| `liveness_ok` | BOOLEAN | Vérification de vivacité (optionnel) |
| `type_pointage` | TEXT | Type : "entrée", "sortie", "Présent", "Retard", "Absent" |
| `created_at` | TIMESTAMPTZ | Date et heure du pointage |
| `timestamp` | TIMESTAMPTZ | Timestamp alternatif (optionnel) |
| `photo` | TEXT | Photo encodée (optionnel) |

### Table `conges`

Gère les demandes de congés.

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | BIGINT | Identifiant unique (clé primaire) |
| `agent_id` | UUID | ID de l'agent (clé étrangère) |
| `date_debut` | DATE | Date de début du congé |
| `date_fin` | DATE | Date de fin du congé |
| `motif` | TEXT | Motif du congé (optionnel) |
| `created_at` | TIMESTAMPTZ | Date de création de la demande |

## Utilisation des Services

Les services fournissent des méthodes pour interagir avec la base de données.

### Service Agents

```typescript
import { agentsService } from '@/services/agentsService';

// Récupérer tous les agents
const agents = await agentsService.getAgents();

// Récupérer un agent par ID
const agent = await agentsService.getAgentById('uuid-here');

// Récupérer un agent par matricule
const agent = await agentsService.getAgentByMatricule('MAT001');

// Créer un agent
const newAgent = await agentsService.createAgent({
  nom: 'Diop',
  prenom: 'Manga',
  matricule: 'MAT001',
  service: 'Sécurité',
  telephone: '77 123 45 67',
});

// Mettre à jour un agent
const updated = await agentsService.updateAgent('uuid-here', {
  telephone: '77 999 88 77',
});

// Supprimer un agent
await agentsService.deleteAgent('uuid-here');
```

### Service Pointages

```typescript
import { pointagesService } from '@/services/pointagesService';

// Récupérer tous les pointages
const pointages = await pointagesService.getPointages();

// Récupérer les pointages avec filtres
const filtered = await pointagesService.getPointages({
  matricule: 'MAT001',
  startDate: '2025-12-01',
  endDate: '2025-12-31',
});

// Créer un pointage
const newPointage = await pointagesService.createPointage({
  matricule: 'MAT001',
  nom: 'Diop',
  prenom: 'Manga',
  service: 'Sécurité',
  type_pointage: 'entrée',
});

// Récupérer les statistiques
const stats = await pointagesService.getPointagesStats('MAT001');
// Retourne: { presenceRate, presents, absents, lates, totalDays }
```

### Service Congés

```typescript
import { congesService } from '@/services/congesService';

// Récupérer tous les congés
const conges = await congesService.getConges();

// Récupérer les congés d'un agent
const agentConges = await congesService.getCongesByAgent('agent-uuid');

// Créer une demande de congé
const newConge = await congesService.createConge({
  agent_id: 'agent-uuid',
  date_debut: '2025-12-15',
  date_fin: '2025-12-20',
  motif: 'Congés annuels',
});

// Vérifier si un agent est en congé
const isOnLeave = await congesService.isAgentOnLeave('agent-uuid', '2025-12-16');
```

## Utilisation des Hooks React Query

Les hooks simplifient l'utilisation dans les composants React.

### Hooks Agents

```typescript
import { useAgents, useCreateAgent, useUpdateAgent } from '@/hooks/useAgents';

function AgentsComponent() {
  // Récupérer tous les agents
  const { data: agents, isLoading, error } = useAgents();

  // Créer un agent
  const createAgent = useCreateAgent();

  const handleCreate = () => {
    createAgent.mutate({
      nom: 'Diop',
      prenom: 'Manga',
      matricule: 'MAT001',
      service: 'Sécurité',
    });
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div>
      {agents?.map(agent => (
        <div key={agent.id}>{agent.nom} {agent.prenom}</div>
      ))}
      <button onClick={handleCreate}>Créer un agent</button>
    </div>
  );
}
```

### Hooks Pointages

```typescript
import { usePointagesByMatricule, usePointagesStats, useCreatePointage } from '@/hooks/usePointages';

function PointagesComponent({ matricule }: { matricule: string }) {
  // Récupérer les pointages d'un agent
  const { data: pointages } = usePointagesByMatricule(matricule);

  // Récupérer les statistiques
  const { data: stats } = usePointagesStats(matricule);

  // Créer un pointage
  const createPointage = useCreatePointage();

  const handlePointage = () => {
    createPointage.mutate({
      matricule,
      nom: 'Diop',
      prenom: 'Manga',
      service: 'Sécurité',
      type_pointage: 'entrée',
    });
  };

  return (
    <div>
      <div>Taux de présence: {stats?.presenceRate}%</div>
      <div>Présents: {stats?.presents}</div>
      <button onClick={handlePointage}>Pointer</button>
    </div>
  );
}
```

### Hooks Congés

```typescript
import { useCongesByAgent, useCreateConge } from '@/hooks/useConges';

function CongesComponent({ agentId }: { agentId: string }) {
  // Récupérer les congés d'un agent
  const { data: conges } = useCongesByAgent(agentId);

  // Créer un congé
  const createConge = useCreateConge();

  const handleCreate = () => {
    createConge.mutate({
      agent_id: agentId,
      date_debut: '2025-12-15',
      date_fin: '2025-12-20',
      motif: 'Congés annuels',
    });
  };

  return (
    <div>
      {conges?.map(conge => (
        <div key={conge.id}>
          {conge.date_debut} - {conge.date_fin}: {conge.motif}
        </div>
      ))}
      <button onClick={handleCreate}>Demander un congé</button>
    </div>
  );
}
```

## Exemples de Code

### Exemple Complet : Dashboard Agent

```typescript
import { useAgentByMatricule } from '@/hooks/useAgents';
import { usePointagesStats, useRecentPointages } from '@/hooks/usePointages';
import { useCongesByAgent } from '@/hooks/useConges';

function AgentDashboard({ matricule }: { matricule: string }) {
  const { data: agent, isLoading: agentLoading } = useAgentByMatricule(matricule);
  const { data: stats } = usePointagesStats(matricule);
  const { data: recentPointages } = useRecentPointages(matricule, 7);
  const { data: conges } = useCongesByAgent(agent?.id);

  if (agentLoading) return <div>Chargement...</div>;
  if (!agent) return <div>Agent non trouvé</div>;

  return (
    <div>
      <h1>{agent.nom} {agent.prenom}</h1>
      <p>Matricule: {agent.matricule}</p>
      <p>Service: {agent.service}</p>

      <h2>Statistiques de présence</h2>
      <p>Taux: {stats?.presenceRate}%</p>
      <p>Présents: {stats?.presents}</p>
      <p>Absents: {stats?.absents}</p>
      <p>Retards: {stats?.lates}</p>

      <h2>Pointages récents</h2>
      {recentPointages?.map(p => (
        <div key={p.id}>
          {new Date(p.created_at).toLocaleDateString()} - {p.type_pointage}
        </div>
      ))}

      <h2>Congés</h2>
      {conges?.map(c => (
        <div key={c.id}>
          {c.date_debut} - {c.date_fin}: {c.motif}
        </div>
      ))}
    </div>
  );
}
```

## Bonnes Pratiques

### Sécurité

1. **Row Level Security (RLS)** : Les politiques RLS sont activées par défaut. Adaptez-les selon vos besoins d'authentification.

2. **Variables d'environnement** : Ne jamais committer `.env.local` dans Git.

3. **Validation** : Validez toujours les données côté client ET côté serveur.

### Performance

1. **Utiliser les hooks React Query** : Ils gèrent automatiquement le cache et les rechargements.

2. **Filtres côté serveur** : Utilisez les filtres dans les services plutôt que de filtrer côté client.

3. **Pagination** : Pour de grandes quantités de données, implémentez la pagination.

### Gestion des Erreurs

```typescript
const { data, error, isLoading } = useAgents();

if (isLoading) {
  return <div>Chargement...</div>;
}

if (error) {
  console.error('Erreur:', error);
  return <div>Une erreur est survenue: {error.message}</div>;
}

// Utiliser data en toute sécurité
```

### Mutations avec Gestion d'Erreur

```typescript
const createAgent = useCreateAgent();

const handleSubmit = async (data) => {
  try {
    await createAgent.mutateAsync(data);
    toast.success('Agent créé avec succès');
  } catch (error) {
    console.error('Erreur:', error);
    toast.error('Erreur lors de la création de l\'agent');
  }
};
```

## Support

Pour plus d'informations :
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation React Query](https://tanstack.com/query/latest/docs/react/overview)
- [Documentation TypeScript](https://www.typescriptlang.org/docs/)
