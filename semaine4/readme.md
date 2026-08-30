# Support Desk - Système de Gestion d'Incidents IT

Ce projet a été développé dans le cadre de la Semaine 4 du "Challenge 8 Projets". Il s'agit d'une application web de type Single Page Application (SPA) permettant la gestion du cycle de vie de tickets de support informatique.

L'objectif technique est de mettre en œuvre une architecture logicielle modulaire en TypeScript natif, sans dépendance à des frameworks front-end, afin de maîtriser les concepts de Programmation Orientée Objet et de manipulation du DOM.

## Fonctionnalités

L'application permet de simuler un environnement de helpdesk d'entreprise avec les capacités suivantes :

* **Création de Tickets** : Interface permettant la saisie du titre, de la description et du niveau de priorité (Bas, Moyen, Urgent).
* **Tableau de Bord** : Visualisation des indicateurs clés (KPI) et liste complète des incidents en cours.
* **Workflow de Résolution** : Gestion des états d'un ticket passant de "Ouvert" à "En Cours", puis "Résolu".
* **Gestion des Priorités** : Distinction visuelle des tickets selon leur urgence pour faciliter le triage.
* **Persistance des Données** : Sauvegarde automatique de l'état de l'application via le LocalStorage du navigateur, assurant la conservation des données après rafraîchissement.

## Stack Technique

* **Langage** : TypeScript (Target ES6).
* **Interface** : HTML5 Sémantique & CSS3 (Grid/Flexbox).
* **Gestionnaire de Paquets** : NPM.
* **Stockage** : LocalStorage API.

## Architecture du Projet

Le code source est organisé selon une séparation des responsabilités (SOC), isolant la logique métier de l'interface utilisateur :

### Dossier src/model
Contient la logique de données et les règles métier.
* **Ticket.ts** : Définit l'interface structurelle d'un ticket et les énumérations pour les statuts et priorités.
* **DataManager.ts** : Agit comme une couche d'abstraction (DAO) pour les opérations CRUD et la communication avec le LocalStorage.

### Dossier src/ui
Gère l'affichage et les interactions utilisateur.
* **FormManager.ts** : Gère la validation des entrées et la soumission du formulaire de création.
* **TicketList.ts** : Responsable du rendu dynamique du tableau des tickets et de l'attachement des événements aux boutons d'action.

### Racine src
* **main.ts** : Point d'entrée de l'application. Il instancie les classes principales et orchestre les flux de données entre le modèle et la vue.

## Installation et Démarrage

Pour exécuter ce projet localement, suivez ces étapes :

1.  **Installation des dépendances**
    Assurez-vous d'avoir Node.js installé, puis exécutez la commande suivante à la racine du projet :
    ```bash
    npm install
    ```

2.  **Compilation**
    Le projet utilise TypeScript. Lancez le compilateur en mode surveillance pour générer le dossier `dist` automatiquement à chaque modification :
    ```bash
    npx tsc --watch
    ```

3.  **Lancement**
    Ouvrez simplement le fichier `index.html` dans votre navigateur web ou utilisez une extension de serveur local (Live Server).

## Auteur

Projet réalisé par un étudiant en BTS SIO (Option Solutions Logicielles et Applications Métiers) dans le cadre d'un parcours d'apprentissage vers le développement Full-Stack.