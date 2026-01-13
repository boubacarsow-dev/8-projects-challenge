# 📋 Kanban App - Vanilla JS

Ce projet est le premier défi de mon challenge **"Vanilla JS Intensive"**.
Il s'agit d'un gestionnaire de tâches (type Trello simplifié) entièrement codé en JavaScript natif, sans framework ni librairie.

**Objectif :** Maîtriser la manipulation du DOM, la gestion d'état (State Management) et la persistance des données via le navigateur.

## 🚀 Fonctionnalités

- **CRUD Complet :** Créer, Lire, Mettre à jour et Supprimer des tâches.
- **Gestion d'état :** Les tâches sont organisées en 3 statuts (`To Do`, `Doing`, `Done`).
- **Persistance des données :** Sauvegarde automatique dans le `localStorage`. Les tâches ne disparaissent pas au rafraîchissement de la page.
- **Interface Réactive :** Design propre réalisé en CSS Grid/Flexbox.

## 🛠️ Stack Technique

- **HTML5** : Structure sémantique.
- **CSS3** : Variables CSS, Flexbox, Grid, pas de framework CSS.
- **JavaScript (ES6+)** :
  - `localStorage` API pour la "base de données".
  - `Array methods` (filter, map, find) pour la manipulation de données.
  - Manipulation du DOM.

## 📂 Structure du projet

```text
/01-kanban-app
│
├── index.html      # Structure de l'application
├── style.css       # Mise en page et design
├── script.js       # Logique métier et gestion des événements
└── README.md       # Documentation du projet