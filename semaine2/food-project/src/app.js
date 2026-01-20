"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// selection des elements
var db_js_1 = require("./db.js");
var monPanier = [];
// --- 1. SÉLECTION DU MENU (Là où on affiche les plats) ---
// Ton ID dans le HTML est "food-container" et c'est une <div>
var foodContainer = document.querySelector('#food-container');
// --- 2. SÉLECTION DES BOUTONS FILTRES ---
// Ce sont plusieurs boutons, donc on utilise querySelectorAll
// On récupère une liste de boutons (NodeList)
var filterButtons = document.querySelectorAll('.filter-btn');
// --- 3. SÉLECTION DU PANIER (La Sidebar) ---
// Ton ID est "panier" et c'est une balise <aside>, donc un HTMLElement générique
var sidebarPanier = document.querySelector('#panier');
var containerItems = document.querySelector('#containerItems');
// --- 4. SÉLECTION DES BOUTONS D'OUVERTURE/FERMETURE ---
// ID "btn-panier" (C'est un <button>)
var btnOuvrirPanier = document.querySelector('#btn-panier');
// ID "fermer-panier" (C'est un <button>)
var btnFermerPanier = document.querySelector('#fermer-panier');
// --- 5. SÉLECTION DES TEXTES A CHANGER (Compteurs/Total) ---
// ID "compteur-panier" (C'est un <span>)
var spanCompteur = document.querySelector('#compteur-panier');
// ID "prix-total" (C'est un <span>)
var spanTotal = document.querySelector('#prix-total');
// travaillons
// implementons la liste de plats
function listPlats(plats) {
    if (foodContainer) {
        foodContainer.innerHTML = '';
        // bouclons les plats
        plats.forEach(function (plat) {
            var monPlat = document.createElement('div');
            monPlat.className = "repas-card";
            // Regarde bien après class="details" et class="description"
            monPlat.innerHTML = "\n    <div class=\"image-box\">\n        <img src=\"".concat(plat.image, "\" alt=\"").concat(plat.nom, "\">\n    </div>\n    <div class=\"details\"> <h3>").concat(plat.nom, "</h3>\n        <p class=\"description\">").concat(plat.description, "</p> <div class=\"price-row\">\n            <span class=\"price\">").concat(plat.prix, " FCFA</span>\n            <button class=\"add-btn\" data-id=\"").concat(plat.id, "\">Ajouter</button>\n        </div>\n    </div>\n");
            foodContainer.appendChild(monPlat);
        });
    }
}
;
listPlats(db_js_1.lesPlats);
//  systeme de filtre
if (filterButtons) {
    filterButtons.forEach(function (bouton) {
        bouton.addEventListener('click', function (event) {
            var categorie = event.target.dataset.filter;
            if (categorie === "all") {
                listPlats(db_js_1.lesPlats);
            }
            else {
                var categorieFiltree = db_js_1.lesPlats.filter(function (plat) { return plat.categorie === categorie; });
                listPlats(categorieFiltree);
            }
        });
    });
}
//  
if (foodContainer) {
    foodContainer.addEventListener('click', function (e) {
        var cible = e.target;
        if (cible.classList.contains('add-btn')) {
            var idPlat = parseInt(cible.dataset.id || "0");
            ajouterPanier(idPlat);
        }
        ;
    });
}
;
// ajoutons au panier
function ajouterPanier(id) {
    var platTrouve = db_js_1.lesPlats.find(function (p) { return p.id === id; });
    if (!platTrouve)
        return;
    var platDansPanier = monPanier.find(function (p) { return p.id === id; });
    if (platDansPanier) {
        platDansPanier.quantite++;
        console.log("quantite augmentee", monPanier);
    }
    else {
        var nouvPanier = __assign(__assign({}, platTrouve), { quantite: 1 });
        monPanier.push(nouvPanier);
        console.log("Nouveau plat ajouté !", monPanier);
    }
    mettreAJourCompteur();
    afficherPanierSidebar();
}
//  mettreAJourCompteur
function mettreAJourCompteur() {
    var total = 0;
    monPanier.forEach(function (p) {
        total += p.quantite;
        if (spanCompteur) {
            spanCompteur.innerText = "".concat(total);
        }
    });
}
//  afficherPanierSidebar
function afficherPanierSidebar() {
    var totalGlobal = 0;
    if (containerItems) {
        containerItems.innerHTML = '';
        monPanier.forEach(function (p) {
            // A. Création visuelle
            var lignePanier = document.createElement('div');
            lignePanier.className = "cart-item";
            lignePanier.innerHTML = "\n                <img src=\"".concat(p.image, "\" alt=\"").concat(p.nom, "\">\n                <div class=\"item-info\">\n                    <h4>").concat(p.nom, "</h4>\n                    <span>").concat(p.prix, " FCFA</span>\n                </div>\n                <div class=\"item-controls\">\n                    <button class=\"btn-moins\" data-id=\"").concat(p.id, "\">-</button>\n                    <span>").concat(p.quantite, "</span>\n                    <button class=\"btn-plus\" data-id=\"").concat(p.id, "\">+</button>\n                </div>\n                <button class=\"btn-trash\" data-id=\"").concat(p.id, "\"><i class=\"fa-solid fa-trash\"></i></button>\n            ");
            containerItems.appendChild(lignePanier);
            totalGlobal += (p.prix * p.quantite);
        });
    }
    if (spanTotal) {
        spanTotal.textContent = "".concat(totalGlobal, " FCFA");
    }
}
