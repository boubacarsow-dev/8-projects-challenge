# 🥘 Dabali Express - Application de Commande de Plats

![Dabali Express Banner](./screenshot.png)
*(Ajoute une capture d'écran de ton site ici plus tard)*

> **Challenge 8 Projets - Semaine 2**
> Une application web dynamique pour commander les meilleurs plats d'Abidjan (Garba, Foutou, Braisé...), entièrement codée en **TypeScript Vanilla**.

## 🌟 Fonctionnalités

- **Menu Interactif** : Affichage dynamique des plats depuis une "base de données" locale.
- **Système de Filtres** : Filtrage par catégorie (Résistance, Braisé, Enjaillement) via les attributs `dataset`.
- **Panier Dynamique** :
  - Ajout de produits.
  - Calcul automatique du total.
  - Modification des quantités (+ / -).
  - Suppression d'articles.
- **Sidebar Animée** : Ouverture et fermeture fluide du panier avec un overlay.
- **Architecture Modulaire** : Utilisation des modules ES6 (`import`/`export`).

## 🛠️ Stack Technique

- **Langage** : TypeScript (Typage strict, Interfaces, DOM Manipulation).
- **Structure** : HTML5 & CSS3 (Grid, Flexbox, Variables CSS).
- **Compilation** : Configuration manuelle du compilateur `tsc` (sans bundler comme Vite ou Webpack).
- **Données** : Tableaux d'objets typés (Interfaces `Mplat`, `PanierItem`).

## 📂 Architecture du Projet

Le projet sépare strictement le code source (développement) du code compilé (production).

```text
DabaliExpress/
├── src/                #  Code Source (TypeScript)
│   ├── db.ts           # Simule la base de données
│   ├── types.ts        # Interfaces et Types
│   ├── main.ts         # Logique principale
│   └── style.css       # Styles
│
├── dist/               #  Code Compilé (JavaScript)
│   └── (Généré automatiquement par tsc)
│
├── index.html          # Point d'entrée (lié à dist/app.js)
├── tsconfig.json       # Configuration du compilateur
└── package.json        # Dépendances