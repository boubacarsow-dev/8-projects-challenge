import type { Ticket } from "./Ticket";

 const cle_stockage = "ticket";

 export class DataManager {
    constructor() {}
  private save(tickets:Ticket[]):void{
    const data = JSON.stringify(tickets)
     localStorage.setItem(cle_stockage, data);
     console.log(`donnees save`);
  }

   //recuperer tous les tickets
     
        getAllTickets(): Ticket[] {
  const data = localStorage.getItem(cle_stockage);
  let listeTickets;
  if(data) {
    listeTickets = JSON.parse(data).map((t: Ticket) => ({
      ...t,
      dateCreation: new Date(t.dateCreation)
    }));
  } else {
    listeTickets = [];
  }
  return listeTickets;
}

    //add
    add(ticket:Ticket){
        const listeExistante = this.getAllTickets();
        let nouvTicket = listeExistante.find(tick =>ticket.id === tick.id);
        if (!nouvTicket) {
            listeExistante.push(ticket)
            this.save(listeExistante)
        } 
    }

    // updateTicke
    updateTicket(updatedTicket: Ticket): void{
        const listeTickets = this.getAllTickets()
        const ticketMaj = listeTickets.map(t => t.id === updatedTicket.id? updatedTicket:t)
        this.save(ticketMaj)
            
    }

    //deleteTicket
   deleteTicket(id: string): void {
  const listeTickets = this.getAllTickets();
  const listeFiltree = listeTickets.filter(t => t.id !== id);
  this.save(listeFiltree);
}
    //fin class
 };