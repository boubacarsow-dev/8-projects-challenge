// selection des elements
import { lesPlats } from './db.js';
let monPanier = [];
// --- 1. SÉLECTION DU MENU (Là où on affiche les plats) ---
// Ton ID dans le HTML est "food-container" et c'est une <div>
const foodContainer = document.querySelector('#food-container');
// --- 2. SÉLECTION DES BOUTONS FILTRES ---
// Ce sont plusieurs boutons, donc on utilise querySelectorAll
// On récupère une liste de boutons (NodeList)
const filterButtons = document.querySelectorAll('.filter-btn');
// --- 3. SÉLECTION DU PANIER (La Sidebar) ---
// Ton ID est "panier" et c'est une balise <aside>, donc un HTMLElement générique
const sidebarPanier = document.querySelector('#panier');
const containerItems = document.querySelector('#containerItems');
// --- 4. SÉLECTION DES BOUTONS D'OUVERTURE/FERMETURE ---
// ID "btn-panier" (C'est un <button>)
const btnOuvrirPanier = document.querySelector('#btn-panier');
// ID "fermer-panier" (C'est un <button>)
const btnFermerPanier = document.querySelector('#fermer-panier');
// --- 5. SÉLECTION DES TEXTES A CHANGER (Compteurs/Total) ---
// ID "compteur-panier" (C'est un <span>)
const spanCompteur = document.querySelector('#compteur-panier');
// ID "prix-total" (C'est un <span>)
const spanTotal = document.querySelector('#prix-total');
// travaillons
// implementons la liste de plats
function listPlats(plats) {
    if (foodContainer) {
        foodContainer.innerHTML = '';
        // bouclons les plats
        plats.forEach(plat => {
            const monPlat = document.createElement('div');
            monPlat.className = "repas-card";
            // Regarde bien après class="details" et class="description"
            monPlat.innerHTML = `
    <div class="image-box">
        <img src="${plat.image}" alt="${plat.nom}">
    </div>
    <div class="details"> <h3>${plat.nom}</h3>
        <p class="description">${plat.description}</p> <div class="price-row">
            <span class="price">${plat.prix} FCFA</span>
            <button class="add-btn" data-id="${plat.id}">Ajouter</button>
        </div>
    </div>
`;
            foodContainer.appendChild(monPlat);
        });
    }
}
;
listPlats(lesPlats);
//  systeme de filtre
if (filterButtons) {
    filterButtons.forEach(bouton => {
        bouton.addEventListener('click', (event) => {
            const categorie = event.target.dataset.filter;
            if (categorie === "all") {
                listPlats(lesPlats);
            }
            else {
                const categorieFiltree = lesPlats.filter(plat => plat.categorie === categorie);
                listPlats(categorieFiltree);
            }
        });
    });
}
//  
if (foodContainer) {
    foodContainer.addEventListener('click', (e) => {
        const cible = e.target;
        if (cible.classList.contains('add-btn')) {
            const idPlat = parseInt(cible.dataset.id || "0");
            ajouterPanier(idPlat);
        }
        ;
    });
}
;
// ajoutons au panier
function ajouterPanier(id) {
    const platTrouve = lesPlats.find(p => p.id === id);
    if (!platTrouve)
        return;
    const platDansPanier = monPanier.find(p => p.id === id);
    if (platDansPanier) {
        platDansPanier.quantite++;
        console.log(`quantite augmentee`, monPanier);
    }
    else {
        const nouvPanier = Object.assign(Object.assign({}, platTrouve), { quantite: 1 });
        monPanier.push(nouvPanier);
        console.log("Nouveau plat ajouté !", monPanier);
    }
    mettreAJourCompteur();
    afficherPanierSidebar();
}
//  mettreAJourCompteur
function mettreAJourCompteur() {
    let total = 0;
    monPanier.forEach(p => {
        total += p.quantite;
        if (spanCompteur) {
            spanCompteur.innerText = `${total}`;
        }
    });
}
//  afficherPanierSidebar
function afficherPanierSidebar() {
    let totalGlobal = 0;
    if (containerItems) {
        containerItems.innerHTML = '';
        monPanier.forEach(p => {
            // A. Création visuelle
            const lignePanier = document.createElement('div');
            lignePanier.className = "panier-item";
            lignePanier.innerHTML = `
                <img src="${p.image}" alt="${p.nom}">
                <div class="item-info">
                    <h4>${p.nom}</h4>
                    <span>${p.prix} FCFA</span>
                </div>
                <div class="item-controls">
                    <button class="btn-moins" data-id="${p.id}">-</button>
                    <span>${p.quantite}</span>
                    <button class="btn-plus" data-id="${p.id}">+</button>
                </div>
                <button class="btn-trash" data-id="${p.id}"><i class="fa-solid fa-trash"></i></button>
            `;
            containerItems.appendChild(lignePanier);
            totalGlobal += (p.prix * p.quantite);
        });
    }
    if (spanTotal) {
        spanTotal.textContent = `${totalGlobal} FCFA`;
    }
}
;
// ouvrir et fermer
//ouvrir
if (btnOuvrirPanier && sidebarPanier) {
    btnOuvrirPanier.addEventListener('click', (e) => {
        sidebarPanier.classList.add('open');
        const overlay = document.querySelector('.overlay');
        if (overlay)
            overlay.classList.add('active');
    });
}
;
//fermer
if (btnFermerPanier && sidebarPanier) {
    btnFermerPanier.addEventListener('click', (e) => {
        sidebarPanier.classList.remove('app');
        const overlay = document.querySelector('.overlay');
        if (overlay)
            overlay.classList.add('active');
    });
}
;
// 
const overlay = document.querySelector('.overlay');
if (overlay && sidebarPanier) {
    overlay.addEventListener('click', () => {
        sidebarPanier.classList.remove('open');
        overlay.classList.remove('active');
    });
    // fait
    // 
    if (containerItems) {
        containerItems.addEventListener('click', (e) => {
            const target = e.target;
            const btnPlus = target.closest('.btn-plus');
            const btnMoins = target.closest('.btn-moins');
            const btnTrash = target.closest('.btn-trash');
            if (btnPlus) {
                const id = parseInt(btnPlus.dataset.id || "0");
                modifierQuantite(id, 1); // On ajoute 1
            }
            // CAS 2 : Clic sur MOINS (-)
            if (btnMoins) {
                const id = parseInt(btnMoins.dataset.id || "0");
                modifierQuantite(id, -1); // On enlève 1
            }
            // CAS 3 : Clic sur POUBELLE
            if (btnTrash) {
                const id = parseInt(btnTrash.dataset.id || "0");
                supprimerArticle(id);
            }
        });
    }
    // 
    // Fonction pour augmenter ou diminuer
    function modifierQuantite(id, changement) {
        // 1. On trouve l'article dans le panier
        const item = monPanier.find(p => p.id === id);
        if (item) {
            // 2. On change la quantité
            item.quantite += changement;
            //
            if (item.quantite < 1) {
                item.quantite = 1;
            }
            // 4. On rafraîchit l'affichage
            mettreAJourCompteur();
            afficherPanierSidebar();
        }
    }
    // Fonction pour supprimer complètement un article
    function supprimerArticle(id) {
        // On filtre le tableau pour garder tout SAUF celui qu'on veut supprimer
        monPanier = monPanier.filter(p => p.id !== id);
        // On rafraîchit l'affichage
        mettreAJourCompteur();
        afficherPanierSidebar();
    }
}
//# sourceMappingURL=app.js.map