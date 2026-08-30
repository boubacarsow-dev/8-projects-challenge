import type { Ticket } from "./Ticket";
import type { Priorite } from "./Ticket";
import  { Statut } from "./Ticket";
export class FormManager {
  private form: HTMLFormElement;
  private inputTitre: HTMLInputElement;
  private inputDescription: HTMLTextAreaElement;
  private selectPriorite: HTMLSelectElement;
  private modalOverlay: HTMLDivElement;
  private btnOpenModal: HTMLButtonElement;
  private btnCloseModal: HTMLButtonElement;
  private btnCancelModal: HTMLButtonElement;

  constructor() {
    // Récupération des éléments du DOM
    this.form = document.getElementById("ticket-form") as HTMLFormElement;
    this.inputTitre = document.getElementById("ticket-titre") as HTMLInputElement;
    this.inputDescription = document.getElementById("ticket-description") as HTMLTextAreaElement;
    this.selectPriorite = document.getElementById("ticket-priorite") as HTMLSelectElement;
    this.modalOverlay = document.getElementById("modal-overlay") as HTMLDivElement;
    this.btnOpenModal = document.getElementById("btn-open-modal") as HTMLButtonElement;
    this.btnCloseModal = document.getElementById("btn-close-modal") as HTMLButtonElement;
    this.btnCancelModal = document.getElementById("btn-cancel-modal") as HTMLButtonElement;

    // Vérification que tous les éléments existent
    if (!this.form || !this.inputTitre || !this.inputDescription || !this.selectPriorite || 
        !this.modalOverlay || !this.btnOpenModal || !this.btnCloseModal || !this.btnCancelModal) {
      throw new Error("Un ou plusieurs éléments du formulaire sont introuvables dans le DOM");
    }

    // Branchement des événements
    this.btnOpenModal.onclick = () => this.openModal();
    this.btnCloseModal.onclick = () => this.closeModal();
    this.btnCancelModal.onclick = () => this.closeModal();
  }

  private openModal(): void {
    this.modalOverlay.classList.remove("modal--hidden");
  }

  private closeModal(): void {
    this.modalOverlay.classList.add("modal--hidden");
    this.resetForm();
  }

  private resetForm(): void {
    this.inputTitre.value = "";
    this.inputDescription.value = "";
    this.selectPriorite.selectedIndex = 1; // Remet sur "Moyenne"
  }

  onSubmit(callback: (ticket: Ticket) => void): void {
    this.form.onsubmit = (e: Event) => {
      e.preventDefault();

      // Récupération des valeurs
      const titre = this.inputTitre.value.trim();
      const description = this.inputDescription.value.trim();
      const priorite = this.selectPriorite.value as Priorite;

      // Validation simple
      if (!titre || !description) {
        alert("Veuillez remplir tous les champs obligatoires");
        return;
      }

      // Création de l'objet Ticket
      const nouveauTicket: Ticket = {
        id: Date.now().toString(),
        titre: titre,
        description: description,
        priorite: priorite,
        statut: Statut.AFaire,
        dateCreation: new Date()
      };

      // Appel du callback
      callback(nouveauTicket);

      // Fermeture de la modale
      this.closeModal();
    };
  }
}