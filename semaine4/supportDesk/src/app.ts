import  { DataManager } from "./DataManager";
import  { FormManager } from "./FormManager";
import  { TicketList } from "./TicketList";
import type { Ticket } from "./Ticket";
import { Statut } from "./Ticket";
class App {
  private dataManager: DataManager;
  private formManager: FormManager;
  private ticketList: TicketList;

  constructor() {
    // Initialisation des composants
    this.dataManager = new DataManager();
    this.formManager = new FormManager();
    this.ticketList = new TicketList("ticket-list");

    // Connecter le formulaire
    this.formManager.onSubmit((nouveauTicket: Ticket) => {
      this.dataManager.add(nouveauTicket);
      this.rafraichir();
    });

    // Connecter les actions sur les tickets
    this.ticketList.bindEvents(
      (id: string) => this.traiterTicket(id),
      (id: string) => this.terminerTicket(id),
      (id: string) => this.supprimerTicket(id)
    );

    // Affichage initial
    this.rafraichir();
  }

  private rafraichir(): void {
    const tickets = this.dataManager.getAllTickets();
    this.ticketList.afficher(tickets);
    this.mettreAJourStatistiques(tickets);
  }

  private traiterTicket(id: string): void {
    const tickets = this.dataManager.getAllTickets();
    const ticket = tickets.find(t => t.id === id);
    
    if (ticket) {
      ticket.statut = Statut.EnCours;
      this.dataManager.updateTicket(ticket);
      this.rafraichir();
    }
  }

  private terminerTicket(id: string): void {
    const tickets = this.dataManager.getAllTickets();
    const ticket = tickets.find(t => t.id === id);
    
    if (ticket) {
      ticket.statut = Statut.Resolu;
      this.dataManager.updateTicket(ticket);
      this.rafraichir();
    }
  }

  private supprimerTicket(id: string): void {
    this.dataManager.deleteTicket(id);
    this.rafraichir();
  }

  private mettreAJourStatistiques(tickets: Ticket[]): void {
    // Total des tickets
    const total = tickets.length;
    
    // Tickets en cours
    const enCours = tickets.filter(t => t.statut === Statut.EnCours).length;
    
    // Tickets urgents
    const urgents = tickets.filter(t => 
      t.statut !== Statut.Resolu && 
      t.priorite === "Urgent"
    ).length;

    // Mettre à jour le DOM
    const totalElement = document.querySelector(".stat-card:nth-child(1) .stat-card__value");
    const enCoursElement = document.querySelector(".stat-card:nth-child(2) .stat-card__value");
    const urgentsElement = document.querySelector(".stat-card:nth-child(3) .stat-card__value");

    if (totalElement) totalElement.textContent = total.toString();
    if (enCoursElement) enCoursElement.textContent = enCours.toString();
    if (urgentsElement) urgentsElement.textContent = urgents.toString();
  }
}

// Initialisation de l'application au chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
  new App();
  console.log("✅ Application SupportDesk initialisée");
});