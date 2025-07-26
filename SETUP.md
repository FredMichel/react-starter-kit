# Setup Guide - Formation IA Agentique

Guide d'installation et de configuration pour la plateforme web de formation IA Agentique.

## 📋 Prérequis

### Logiciels Requis
- **Bun** >= 1.2.0 (Runtime JavaScript)
- **Git** (Gestion de versions)
- **Node.js** >= 18 (optionnel, Bun est préféré)

### Installation des Prérequis

#### 1. Installer Bun
```bash
# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# Windows (PowerShell)
irm bun.sh/install.ps1 | iex

# Vérifier l'installation
bun --version
```

#### 2. Vérifier Git
```bash
git --version
```

## 🚀 Installation du Projet

### 1. Cloner le Repository
```bash
git clone https://github.com/FredMichel/react-starter-kit.git
cd react-starter-kit
```

### 2. Installer les Dépendances
```bash
bun install
```

### 3. Vérifier l'Installation
```bash
# Test des dépendances
bun --version
ls node_modules/

# Test de compilation TypeScript
bun run type-check
```

## 🛠️ Commandes de Développement

### Commandes Principales
```bash
# Démarrer le serveur de développement
bun dev                      # Lance app sur http://localhost:5173/

# Construire pour la production
bun run build               # Build all workspaces (app, api, edge)

# Exécuter les tests
bun test                    # Run all tests
bun test --watch           # Watch mode

# Linting et qualité
bun run lint               # ESLint check
bun run type-check         # TypeScript validation
```

### Commandes par Workspace
```bash
# App (Frontend React)
bun --cwd app dev          # Dev server
bun --cwd app build        # Build app

# API (Backend tRPC)
bun --cwd api build        # Build API types

# Database
bun --cwd db generate      # Generate migrations
bun --cwd db push          # Apply schema changes
bun --cwd db studio        # Open DB GUI
bun --cwd db seed          # Seed sample data

# Edge (Cloudflare Workers)
bun --cwd edge build       # Build for Workers
```

## 🏗️ Architecture du Projet

### Structure des Workspaces
```
react-starter-kit/
├── app/                   # Frontend React 19 + TanStack Router
├── api/                   # Backend tRPC + Hono
├── edge/                  # Cloudflare Workers deployment
├── db/                    # Database schemas + Drizzle ORM
├── core/                  # Shared utilities
└── scripts/               # Build scripts
```

### Technologies Utilisées
- **Frontend**: React 19, TanStack Router, Jotai, ShadCN UI, Tailwind CSS v4
- **Backend**: Hono framework, tRPC
- **Database**: Cloudflare D1 (SQLite), Drizzle ORM
- **Testing**: Vitest, Happy DOM
- **Styling**: Tailwind CSS v4
- **Deployment**: Cloudflare Workers

## 🔧 Configuration Environnement

### Variables d'Environnement
Copier `.env` et ajuster les variables selon vos besoins:

```bash
# Cloudflare Configuration
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token

# Application Configuration
APP_NAME="Formation IA Agentique"
APP_VERSION="1.0.0"
ENVIRONMENT=development
```

### Configuration IDE
Le projet inclut des configurations pour:
- **VSCode**: `.vscode/settings.json`
- **ESLint**: `eslint.config.ts`
- **TypeScript**: `tsconfig.json`
- **Prettier**: `.prettierignore`

## 🧪 Tests et Qualité

### Exécution des Tests
```bash
# Tous les tests
bun test

# Tests en mode watch
bun test --watch

# Tests avec couverture (à configurer)
bun test --coverage
```

### Linting et Formatage
```bash
# Vérification ESLint
bun run lint

# Vérification TypeScript
bun run type-check

# Formatage automatique (Prettier intégré)
# Formatage automatique en sauvegarde avec VSCode
```

## 🚀 Déploiement

### Prérequis Cloudflare
1. Créer un compte Cloudflare
2. Configurer Wrangler CLI
3. Obtenir API Token et Account ID

### Commandes de Déploiement
```bash
# Déploiement production
bun run deploy

# Avec Wrangler directement
bun wrangler deploy --env production

# Déploiement développement
bun wrangler deploy --env development
```

## 📚 Documentation Additionnelle

### Liens Utiles
- [React Starter Kit Original](https://github.com/kriasoft/react-starter-kit)
- [Bun Documentation](https://bun.sh/docs)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [TanStack Router](https://tanstack.com/router/latest)
- [Drizzle ORM](https://orm.drizzle.team/)

### Fichiers de Configuration Importants
- `package.json` - Métadonnées et scripts
- `vitest.config.ts` - Configuration des tests
- `wrangler.jsonc` - Configuration Cloudflare Workers
- `tsconfig.json` - Configuration TypeScript

## 🐛 Dépannage

### Problèmes Courants

#### Erreur "bun: command not found"
```bash
# Recharger le shell
exec $SHELL

# Ou ajouter manuellement au PATH
export PATH="$HOME/.bun/bin:$PATH"
```

#### Tests échouent avec "no test files"
```bash
# Normal pour un nouveau projet
# Les tests seront ajoutés pendant le développement
```

#### Build échoue
```bash
# Vérifier les dépendances
bun install

# Nettoyer le cache
rm -rf node_modules/.cache
bun install
```

#### Port déjà utilisé
```bash
# Le serveur utilisera automatiquement un port libre
# Vérifier dans la sortie console le port utilisé
```

---

*Guide créé le 2025-07-26 pour la Formation IA Agentique - ib Cegos IA102*