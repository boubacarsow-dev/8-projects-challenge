 type Statut = "Prospect"| "En visite"|"negociation"|"vendu"|"annule";
 export interface Client  {
    id:string,
    nom:string,
    telephone:number,
    email?:string,
    statut:Statut,
    note:string
}