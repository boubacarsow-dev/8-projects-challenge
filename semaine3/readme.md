C'est super. Maintenant que tu as le "corps" (HTML) et les "vêtements" (CSS), ton application est belle mais elle est **morte**. Si tu cliques sur les boutons, rien ne se passe.

Les prochaines étapes servent à lui donner un **cerveau** et des **muscles**.

Voici le plan d'attaque logique pour le TypeScript, étape par étape :

### Étape 1 : Le Contrat (Dans `model/Client.ts`)

Avant de manipuler des données, on doit expliquer à TypeScript ce qu'est un "Client" valide.

* **Le but :** Créer une "forme" (Interface) obligatoire.
* **Ce qu'on va faire :** On va dire à TS : *"Attention, interdiction de créer un client s'il n'a pas un ID, un Nom et un Statut. Par contre, l'email est optionnel."*
* On va aussi lister les 5 statuts possibles (Prospect, Vendu, etc.) pour éviter les fautes de frappe.

### Étape 2 : La Mémoire (Dans `model/DataManager.ts`)

C'est la partie invisible.

* **Le but :** Créer un "Magasinier" qui s'occupe du Stockage.
* **Ce qu'on va faire :** On va créer une classe (une usine) avec 3 fonctions principales :
1. `getClient()` : "Va voir dans le navigateur (LocalStorage) si on a déjà des clients, et ramène-les-moi."
2. `addClient()` : "Prends ce nouveau client, ajoute-le à la liste, et sauvegarde le tout."
3. `deleteClient()` : "Trouve ce client par son ID et supprime-le."



### Étape 3 : Les Yeux et les Oreilles (Dans `ui/FormManager.ts`)

On remonte vers l'interface.

* **Le but :** Surveiller le formulaire.
* **Ce qu'on va faire :**
* Repérer les champs `<input>` dans le HTML grâce à leurs IDs.
* Installer un "mouchard" (EventListener) sur le bouton "Ajouter".
* Quand l'utilisateur clique : on récupère tout ce qu'il a tapé, on vérifie que c'est bon, et on prépare le paquet pour le Magasinier.



### Étape 4 : L'Artiste (Dans `ui/ClientList.ts`)

C'est lui qui dessine le tableau.

* **Le but :** Transformer des données brutes en HTML visible.
* **Ce qu'on va faire :**
* Créer une fonction qui reçoit la liste des clients.
* Pour chaque client, elle va fabriquer une ligne de tableau (`<tr>`) avec les bonnes colonnes.
* Elle va aussi colorier le badge (Bleu pour Prospect, Vert pour Vendu) selon le statut.
* Elle va ajouter le petit bouton "Supprimer" au bout de la ligne.



### Étape 5 : Le Chef d'Orchestre (Dans `main.ts`)

C'est la touche finale.

* **Le but :** Démarrer l'application.
* **Ce qu'on va faire :**
* Au chargement de la page, on demande au Magasinier de sortir les données.
* On demande à l'Artiste de les afficher.
* On active le Formulaire pour qu'il soit prêt à enregistrer de nouveaux clients.



---

**On commence par l'Étape 1 (Le Contrat/Model).** C'est la plus courte mais la plus importante pour la sécurité de ton code.

Dis-moi quand tu es prêt à définir les types ! 🧠