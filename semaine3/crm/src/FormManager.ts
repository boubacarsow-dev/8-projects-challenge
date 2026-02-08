import type { Client } from "./Client.js";

export class FormManager {
    formulaire:HTMLFormElement;
    nom:HTMLInputElement;
    telephone : HTMLInputElement;
    email:HTMLInputElement;
    statut:HTMLSelectElement;
    submit:HTMLButtonElement;
    note:HTMLTextAreaElement;
    constructor(){
        this.formulaire = document.getElementById('formulaire-client') as HTMLFormElement;
        this.nom = document.getElementById('nom') as HTMLInputElement;
        this.telephone  = document.getElementById('telephone') as HTMLInputElement;
         this.email = document.getElementById('email') as HTMLInputElement;
        this.note= document.getElementById('note') as HTMLTextAreaElement;
        this.statut = document.getElementById('statut') as HTMLSelectElement;
        this.submit = document.querySelector('.bouton-ajouter') as HTMLButtonElement;
    }

    // 
    onSubmit(action:(client:Client)=> void){
        this.formulaire.addEventListener('submit', (e)=>{
            e.preventDefault();
            const nouveauClient:Client = {
                id:Date.now().toString(),
                nom:this.nom.value,
                telephone:this.telephone.value as any,
                email:this.email.value,
                note:this.note.value,
                statut:this.statut.value as any
            } 
            action(nouveauClient);
            this.formulaire.reset()
        })
        
    }
}