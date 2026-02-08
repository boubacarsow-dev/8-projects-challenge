// les data
import type {  Client } from "./Client.js"
export class DataManager {
    constructor(){
    }

    // sauvegardons
    save(client:Client[]){
        const data = JSON.stringify(client);
        localStorage.setItem('crmData', data);
        //   console.log("sauvegarde effectuees");
    }

    // getClients
    getClients():Client[]{
         const data = localStorage.getItem("crmData");
         let listeClients;
            if(data){
                 listeClients = JSON.parse(data)
            }
            else{
                listeClients = []
            }
            return listeClients
    }

    // ajouter
    addClient(client:Client){
     const listeExistante = this.getClients();
     let client_ajoute = listeExistante.find(cli => client.id === cli.id);
     if(!client_ajoute){
      listeExistante.push(client)
        this.save(listeExistante)
     }else{
         return 0
     }
    
    };

    // supp
     deleteClient(id:string):Client[]{
    const listActu = this.getClients();
    let client_supprime = listActu.find(iCli => iCli.id === id);
    if(!client_supprime){
     return listActu
    }else{
    const id_supprimer = listActu.filter(i => id !== i.id);
    this.save(id_supprimer)
    return id_supprimer
     
    }
     }
}