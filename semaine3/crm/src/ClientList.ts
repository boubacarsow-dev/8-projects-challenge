import type { Client } from "./Client.js";
export class ClientList {
    bodyClient: HTMLTableSectionElement;
    compteur:HTMLSpanElement;
    constructor() {
        this.bodyClient= document.getElementById('liste-clients') as HTMLTableSectionElement
     this.compteur = document.getElementById('compteur-clients') as HTMLSpanElement
    }
    // 
    private obtenirStatutClient(statut: string): string {
        switch (statut) {
            case 'Prospect': return 'statut-prospect';     // Bleu
            case 'En Visite': return 'statut-visite';      // Jaune
            case 'Négociation': return 'statut-negociation'; // Violet
            case 'Vendu': return 'statut-vendu';           // Vert
            case 'Annulé': return 'statut-annule';         // Rouge
            default: return '';
        }
    }

    // afficher les clients
   afficher(liste:Client[]){
    this.bodyClient.innerHTML = '';
    this.compteur.textContent= `${liste.length} clients`

    // 
    liste.forEach(client => {
            const ligne = document.createElement('tr');
            
            // À TOI DE JOUER : Remplace les ... par les données du client
            // Utilise la syntaxe ${client.propriete}
            ligne.innerHTML = `
                <td>
                    <strong> ${client.nom}</strong> <br/>
                    <small> ${client.telephone} </small>
                </td>
                <td> ${client.note} </td>
                <td>
                    <span class="badge-statut ${this.obtenirStatutClient(client.statut)}">
                        ${client.statut}
                    </span>
                </td>
                <td>
                    <button class="btn-supprimer" data-id="${client.id}">Supprimer</button>
                </td>
            `;
            this.bodyClient.appendChild(ligne);
    })
    }
}