# CRM Admin Panel - Gestionnaire de Clients

> **Challenge 8 Projets - Semaine 3**
> Application Back-Office pour la gestion de clients (CRUD, LocalStorage, Filtres), codée en **TypeScript Vanilla**.

---

## 📌 Context & Objectif Pédagogique

Après avoir posé la structure HTML et les styles CSS, l'application était statique. L'objectif principal de cette semaine était de lui donner de la logique métier et de l'interactivité en **TypeScript**, tout en découpant le code selon une **architecture modulaire et propre**.

Ce projet m'a permis de pratiquer :
- La création d'interfaces et de types stricts (`Client`, `StatutClient`).
- La persistance des données locales avec `LocalStorage`.
- La séparation des responsabilités (Model, Data, UI, Controller).
- La manipulation dynamique du DOM et la gestion des événements.

---

## 🛠️ Architecture & Plan d'Attaque

Le code est structuré en plusieurs modules dans le dossier `src/` pour éviter d'avoir un fichier `main.ts` gigantesque :

```text
crm/
├── public/
├── src/
│   ├── Client.ts        # Étape 1 : Modèle & Interfaces (Le Contrat)
│   ├── DataManager.ts   # Étape 2 : Stockage & LocalStorage (La Mémoire)
│   ├── FormManager.ts   # Étape 3 : Événements & Formulaire (Les Mouchards)
│   ├── ClientList.ts    # Étape 4 : Rendu HTML du Tableau (L'Artiste)
│   └── main.ts          # Étape 5 : Initialisation (Le Chef d'Orchestre)
├── index.html
├── package.json
└── tsconfig.json