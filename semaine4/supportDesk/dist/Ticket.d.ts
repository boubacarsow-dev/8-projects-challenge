export declare enum Statut {
    AFaire = "AFaire",
    EnCours = "EnCours",
    Resolu = "Resolu"
}
export declare enum Priorite {
    Faible = "Faible",
    Moyenne = "Moyenne",
    Urgent = "Urgent"
}
export interface Ticket {
    id: string;
    titre: string;
    description: string;
    statut: Statut;
    priorite: Priorite;
    dateCreation: Date;
}
//# sourceMappingURL=Ticket.d.ts.map