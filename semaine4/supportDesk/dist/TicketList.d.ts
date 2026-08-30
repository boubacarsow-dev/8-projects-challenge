import type { Ticket } from "./Ticket";
export declare class TicketList {
    private container;
    constructor(containerId: string);
    afficher(tickets: Ticket[]): void;
    private genererLigneTicket;
    private getPrioriteClass;
    private getPrioriteLabel;
    private getStatutClass;
    private getStatutLabel;
    private formaterDate;
    private genererInitiales;
    private genererCouleurAvatar;
    private echapper;
    bindEvents(onTraiter: (id: string) => void, onTerminer: (id: string) => void, onSupprimer: (id: string) => void): void;
}
//# sourceMappingURL=TicketList.d.ts.map