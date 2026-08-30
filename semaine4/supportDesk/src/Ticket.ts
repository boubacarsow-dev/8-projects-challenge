// le ticket
 export enum Statut{
    AFaire = "AFaire",
    EnCours = "EnCours",
    Resolu = "Resolu"
}
// enum pour Priorite
 export enum Priorite{
    Faible = "Faible",
    Moyenne = "Moyenne",
    Urgent = "Urgent"
 }
//  interface
 export interface Ticket{
    id:string,
    titre:string,
    description:string,
    statut:Statut,
    priorite:Priorite,
    dateCreation: Date
 }