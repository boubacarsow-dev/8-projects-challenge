// selection des elements
import { lesPlats } from './db.js';
import type { PanierItem, CategoriePlat, Mplat } from './types.js'
 let monPanier:PanierItem[] = []
// --- 1. SÉLECTION DU MENU (Là où on affiche les plats) ---
// Ton ID dans le HTML est "food-container" et c'est une <div>
const foodContainer = document.querySelector<HTMLDivElement>('#food-container');


// --- 2. SÉLECTION DES BOUTONS FILTRES ---
// Ce sont plusieurs boutons, donc on utilise querySelectorAll
// On récupère une liste de boutons (NodeList)
const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filter-btn');


// --- 3. SÉLECTION DU PANIER (La Sidebar) ---
// Ton ID est "panier" et c'est une balise <aside>, donc un HTMLElement générique
const sidebarPanier = document.querySelector<HTMLElement>('#panier');

const containerItems = document.querySelector<HTMLDivElement>('#containerItems')
// --- 4. SÉLECTION DES BOUTONS D'OUVERTURE/FERMETURE ---
// ID "btn-panier" (C'est un <button>)
const btnOuvrirPanier = document.querySelector<HTMLButtonElement>('#btn-panier');

// ID "fermer-panier" (C'est un <button>)
const btnFermerPanier = document.querySelector<HTMLButtonElement>('#fermer-panier');


// --- 5. SÉLECTION DES TEXTES A CHANGER (Compteurs/Total) ---
// ID "compteur-panier" (C'est un <span>)
const spanCompteur = document.querySelector<HTMLSpanElement>('#compteur-panier');

// ID "prix-total" (C'est un <span>)
const spanTotal = document.querySelector<HTMLSpanElement>('#prix-total');

// travaillons
// implementons la liste de plats
 function listPlats(plats:Mplat[]) {
    if(foodContainer){
        foodContainer.innerHTML = '';
        // bouclons les plats
       plats.forEach(plat =>{
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
 };
 listPlats(lesPlats)

//  systeme de filtre
 if(filterButtons){
   filterButtons.forEach(bouton =>{
      bouton.addEventListener('click', (event) =>{
      const categorie = (event.target as HTMLButtonElement).dataset.filter;
         if(categorie === "all"){
            listPlats(lesPlats);
         }
         else{
            const categorieFiltree = lesPlats.filter(plat => plat.categorie === categorie);
            listPlats(categorieFiltree);
         }
      })
   })
 }

//  
 
if(foodContainer){
   foodContainer.addEventListener('click', (e)=>{
      const cible = e.target as HTMLElement;
      if(cible.classList.contains('add-btn')){
         const idPlat = parseInt(cible.dataset.id || "0");
         ajouterPanier(idPlat)
      };
   })
};

// ajoutons au panier

 function ajouterPanier(id:number) {
   const platTrouve = lesPlats.find(p => p.id === id);
   if(!platTrouve) return;
   const platDansPanier = monPanier.find( p => p.id === id)
   if(platDansPanier){
      platDansPanier.quantite++;
      console.log(`quantite augmentee`, monPanier);
      
   }
    else{
      const nouvPanier:PanierItem = {
         ...platTrouve,
         quantite:1
      }
      monPanier.push(nouvPanier);
      console.log("Nouveau plat ajouté !", monPanier);
    }

    mettreAJourCompteur();
     afficherPanierSidebar()
 }


//  mettreAJourCompteur
 function mettreAJourCompteur() {
   let total= 0;
   monPanier.forEach(p =>{
      
      total += p.quantite
      if(spanCompteur){
         spanCompteur.innerText = `${total}`;
      }
   })
 }

//  afficherPanierSidebar

 
function afficherPanierSidebar() {
    let totalGlobal = 0;

    if (containerItems) {
        containerItems.innerHTML = '';

        monPanier.forEach(p => {
            // A. Création visuelle
            const lignePanier = document.createElement('div');
            lignePanier.className = "cart-item";
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