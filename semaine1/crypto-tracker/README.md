#  Crypto Market Tracker

Un tableau de bord financier en temps réel qui suit les performances des 50 plus grandes crypto-monnaies mondiales. Ce projet met l'accent sur la **consommation d'API**, la **gestion de données asynchrones** et une interface utilisateur **Dark Mode** de type "Enterprise".

![Aperçu du projet](./screenshot.png)
*(Ajoute une capture d'écran de ton projet ici)*

##  Fonctionnalités Clés

* **Données en Temps Réel :** Connexion directe à l'API CoinGecko pour récupérer les prix et volumes à jour.
* **Interface Data-Centric :** Présentation sous forme de tableau de données structuré (Grid Layout) pour une lisibilité maximale sur Desktop.
* **Formatage Financier :** Utilisation de `Intl.NumberFormat` pour un affichage précis des devises (USD).
* **Indicateurs de Tendance :** Code couleur dynamique (Vert/Rouge) pour visualiser instantanément les variations de marché (24h).
* **Auto-Refresh :** Mise à jour automatique des données toutes les 60 secondes sans rechargement de page.

## 🛠️ Stack Technique

Projet réalisé en **Vanilla JavaScript** (Sans framework) pour maîtriser les fondamentaux du web.

* **HTML5 :** Structure sémantique.
* **CSS3 :** Utilisation avancée de **CSS Grid** pour l'alignement du tableau et **Flexbox** pour les composants internes. Design "Dark Mode" moderne.
* **JavaScript (ES6+) :**
    * `async / await` pour la gestion des requêtes API.
    * `fetch()` pour la communication HTTP.
    * Manipulation du DOM pour l'injection dynamique des données.
    * Gestion des erreurs (`try / catch`).

## 💡 Code Highlights (Ce que j'ai appris)

### 1. Gestion Asynchrone Propre
Utilisation de la syntaxe moderne `async/await` pour éviter le "Callback Hell" et rendre le code lisible.

```javascript
async function fetchCrypto() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erreur serveur");
        const data = await response.json();
        affichage(data);
    } catch (error) {
        console.error(error);
    }
}