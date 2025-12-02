# Portail Employé

Application web de gestion de présence pour employés, construite avec React, TypeScript, Tailwind CSS et Vite.

## 🎯 Fonctionnalités

- **Connexion simulée** - Authentification locale sans backend
- **Dashboard** - Vue d'ensemble de la présence, statistiques et notifications
- **Profil employé** - Informations personnelles et professionnelles
- **Justification d'absence** - Formulaire avec date, motif et upload optionnel
- **Design responsive** - Interface adaptée mobile, tablette et desktop

## 🎨 Design

- **Palette de couleurs** : Vert (#10B981) et blanc uniquement
- **Style** : Moderne et épuré avec des cartes blanches à bords arrondis
- **Typographie** : Police Inter pour une lisibilité optimale
- **Responsive** : Adaptatif de mobile à desktop

## 🚀 Installation et démarrage

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn

### Étapes d'installation

```bash
# 1. Cloner le projet
git clone <votre-url-git>

# 2. Accéder au dossier du projet
cd portail-employe

# 3. Installer les dépendances
npm install

# 4. Lancer l'application en mode développement
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:5173`

## 🔐 Connexion

**Important** : Cette application fonctionne entièrement en local avec des données mockées. **Aucun compte Supabase ou backend externe n'est nécessaire**.

Pour vous connecter à l'application :

**Email** : `manga@example.com`  
**Mot de passe** : `password123`

Ces identifiants sont définis dans le fichier `src/data/mockData.ts` et peuvent être modifiés selon vos besoins.

## 📁 Structure du projet

```
portail-employe/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── Navigation.tsx   # Barre de navigation
│   │   └── ui/              # Composants UI (shadcn)
│   ├── pages/               # Pages de l'application
│   │   ├── Login.tsx        # Page de connexion
│   │   ├── Dashboard.tsx    # Tableau de bord
│   │   ├── Profile.tsx      # Profil employé
│   │   └── Justification.tsx # Formulaire de justification
│   ├── data/
│   │   └── mockData.ts      # Données mockées (utilisateur, stats, etc.)
│   ├── hooks/               # Hooks React personnalisés
│   ├── lib/                 # Utilitaires
│   └── index.css            # Styles globaux et design system
├── public/                  # Fichiers statiques
└── package.json             # Dépendances du projet
```

## 💾 Données et stockage

### Pas de backend requis

Cette application fonctionne **100% en local** :

- ✅ **Données mockées** : Toutes les données sont stockées dans `src/data/mockData.ts`
- ✅ **Authentification locale** : Vérification des identifiants côté client uniquement
- ✅ **Pas de serveur** : Aucun backend, API ou base de données externe n'est utilisé
- ✅ **Pas de compte Supabase** : Vous n'avez **PAS** besoin de créer un compte Supabase ou de configurer une base de données

### Comment modifier les données

Pour personnaliser les données de l'application, éditez le fichier `src/data/mockData.ts` :

```typescript
// Modifier l'utilisateur
export const mockUser = {
  name: "Votre Nom",
  email: "votre@email.com",
  password: "votremotdepasse",
  job: "Votre Poste",
  phone: "Votre Numéro"
};

// Modifier les statistiques de présence
export const presenceStats = {
  presenceRate: 85,
  presents: 20,
  absents: 3
};

// Ajouter/modifier des pointages
export const pointageRecords = [
  { date: "2025-12-02", arrival: "08:15", departure: "17:00", status: "Présent" },
  // ... ajoutez vos propres enregistrements
];

// Ajouter/modifier des notifications
export const notifications = [
  { id: 1, message: "Votre message ici" },
  // ... ajoutez vos propres notifications
];
```

## 🛠️ Technologies utilisées

- **React 18** - Framework JavaScript
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI accessibles
- **React Router** - Gestion des routes
- **Lucide React** - Icônes
- **date-fns** - Gestion des dates

## 📱 Responsivité

L'application est entièrement responsive avec des breakpoints adaptés :

- **Mobile** : < 640px
- **Tablet** : 640px - 1024px
- **Desktop** : > 1024px

Tous les écrans sont optimisés pour une expérience fluide sur tous les appareils.

## 🎨 Personnalisation du design

Le design system est centralisé dans `src/index.css` et `tailwind.config.ts`. Pour modifier les couleurs :

1. **index.css** : Variables CSS (HSL)
2. **tailwind.config.ts** : Configuration Tailwind avec les couleurs personnalisées

## 📦 Scripts disponibles

```bash
# Démarrer en mode développement
npm run dev

# Compiler pour la production
npm run build

# Prévisualiser la build de production
npm run preview

# Linter le code
npm run lint
```

## 🚀 Déploiement

Pour déployer l'application :

```bash
# 1. Créer le build de production
npm run build

# 2. Le dossier 'dist' contient l'application prête à déployer
# Vous pouvez le déployer sur :
# - Vercel
# - Netlify
# - GitHub Pages
# - Lovable.dev
# - Ou tout autre hébergeur de fichiers statiques
```

## 📄 Licence

Ce projet est libre de droits pour usage personnel et professionnel.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

**Note importante** : Cette application est conçue pour fonctionner entièrement en local sans aucune dépendance externe. Aucune configuration de backend, base de données ou service tiers n'est nécessaire.
