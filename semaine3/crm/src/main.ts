import { ClientList } from './ClientList.js';
import { FormManager } from './FormManager.js';
import { DataManager } from './DataManager.js';

// On attend que le HTML soit totalement prêt
window.addEventListener('DOMContentLoaded', () => {
    const dataManager = new DataManager();
    const clientList = new ClientList();
    const formManager = new FormManager();

    function rafraichir() {
        const clients = dataManager.getClients();
        clientList.afficher(clients);
    }

    formManager.onSubmit((nouveauClient) => {
        dataManager.addClient(nouveauClient);
        rafraichir();
    });

    const tableau = document.getElementById('liste-clients');
    if (tableau) {
        tableau.addEventListener('click', (e) => {
            const cible = e.target as HTMLElement;
            if (cible.classList.contains('btn-supprimer')) {
                const id = cible.getAttribute('data-id');
                if (id) {
                    dataManager.deleteClient(id);
                    rafraichir();
                }
            }
        });
    }

    // Premier affichage
    rafraichir();
});