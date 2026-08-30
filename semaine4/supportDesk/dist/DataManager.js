const cle_stockage = "ticket";
export class DataManager {
    constructor() { }
    save(tickets) {
        const data = JSON.stringify(tickets);
        localStorage.setItem(cle_stockage, data);
        console.log(`donnees save`);
    }
    //recuperer tous les tickets
    getAllTickets() {
        const data = localStorage.getItem(cle_stockage);
        let listeTickets;
        if (data) {
            listeTickets = JSON.parse(data).map((t) => (Object.assign(Object.assign({}, t), { dateCreation: new Date(t.dateCreation) })));
        }
        else {
            listeTickets = [];
        }
        return listeTickets;
    }
    //add
    add(ticket) {
        const listeExistante = this.getAllTickets();
        let nouvTicket = listeExistante.find(tick => ticket.id === tick.id);
        if (!nouvTicket) {
            listeExistante.push(ticket);
            this.save(listeExistante);
        }
    }
    // updateTicke
    updateTicket(updatedTicket) {
        const listeTickets = this.getAllTickets();
        const ticketMaj = listeTickets.map(t => t.id === updatedTicket.id ? updatedTicket : t);
        this.save(ticketMaj);
    }
    //deleteTicket
    deleteTicket(id) {
        const listeTickets = this.getAllTickets();
        const listeFiltree = listeTickets.filter(t => t.id !== id);
        this.save(listeFiltree);
    }
}
;
//# sourceMappingURL=DataManager.js.map