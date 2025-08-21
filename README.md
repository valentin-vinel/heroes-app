# HeroesApp

Application web permettant de gérer des héros Marvel avec authentification, gestion des rôles (user/admin) et API REST sécurisée.
Le projet est divisé en deux parties :

- **back/** → API Node.js (Express + Sequelize + PostgreSQL)
- **front/** → Interface utilisateur (Angular)

## 🚀 Prérequis

Avant de lancer l’application, assurez-vous d’avoir installé :
- **Node.js**
 (>= 18.x recommandé)
- **PostgreSQL**
 (>= 16.x recommandé)
- **npm**
- **Angular CLI**
 (>= 17.x recommandé)
- **TypeScript**
- **Firebase CLI**
 (pour le déploiement front)
- **Un compte Render**
 (pour le déploiement back)

## ⚙️ Installation et lancement en local

1. **Cloner le dépôt**
```bash
git clone <https://github.com/valentin-vinel/heroes-app.git>
cd heroes-app
```

2. **Installer les dépendances**

*Back-end*
```bash
cd back
npm install
```

*Front-end*
```bash
cd ../front
npm install
```

3. **Configurer les variables d’environnement**

Créer un fichier .env dans back/ avec les variables suivantes :
```env
PG_URL=postgresql://<user>:<password>@localhost:5432/<database>
PORT=5000
JWT_SECRET=monSecretJWT
```

Dans front/, configurer l’URL de l’API (Render ou locale) dans .env :
```env
API_URL=http://localhost:5000
```

4. **Lancer l’application**

*Back-end*
cd back
npm run dev
```

*Front-end*
```bash
cd ../front
ng serve
```

Par défaut :

**API disponible sur http://localhost:5000**

**Front disponible sur http://localhost:4200**

## 🌐 Déploiement

#### Back-end (API) sur Render
1. Pousser le code sur GitHub.
2. Créer un service Web sur Render et connecter le repo.
3. Ajouter les variables d’environnement dans le dashboard Render (PG_URL, JWT_SECRET, PORT).
4. Lancer le déploiement automatique.

#### Front-end sur Firebase
1. **Installer Firebase CLI :**
```bash
npm install -g firebase-tools
```

2. **Se connecter à Firebase :**
```bash
firebase login
```

3. **Initialiser Firebase Hosting dans front/ :**
```bash
firebase init hosting
```
→ Choisir le dossier dist/front (ou équivalent selon le nom de ton projet Angular) comme répertoire de build.

4. **Compiler et déployer :**
```bash
ng build
firebase deploy
```

## ✅ Tests après déploiement

1. Vérifier l’accès à l’API via Postman ou REST Client :

- GET /heroes → liste des héros
- POST /auth/login → authentification
- DELETE /heroes/:id → suppression (admin uniquement)

2. Vérifier sur le front Angular :

- Connexion / inscription d’un utilisateur
- Ajout et suppression d’un héros
- Gestion des rôles (user/admin)