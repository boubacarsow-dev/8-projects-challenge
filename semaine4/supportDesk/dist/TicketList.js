import { Statut, Priorite } from "./Ticket";
export class TicketList {
    constructor(containerId) {
        const element = document.getElementById(containerId);
        if (!element) {
            throw new Error(`L'élément avec l'id "${containerId}" est introuvable`);
        }
        this.container = element;
    }
    afficher(tickets) {
        this.container.innerHTML = "";
        if (tickets.length === 0) {
            this.container.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);">
            Aucun ticket pour le moment
          </td>
        </tr>
      `;
            return;
        }
        tickets.forEach(ticket => {
            const row = this.genererLigneTicket(ticket);
            this.container.innerHTML += row;
        });
    }
    genererLigneTicket(ticket) {
        const prioriteClass = this.getPrioriteClass(ticket.priorite);
        const prioriteLabel = this.getPrioriteLabel(ticket.priorite);
        const statutClass = this.getStatutClass(ticket.statut);
        const statutLabel = this.getStatutLabel(ticket.statut);
        const dateFormatee = this.formaterDate(ticket.dateCreation);
        const initiales = this.genererInitiales(ticket.titre);
        const avatarColor = this.genererCouleurAvatar(ticket.id);
        return `
      <tr class="ticket-row" data-id="${ticket.id}">
        <td><a href="#" class="ticket-id">${ticket.id}</a></td>
        <td class="ticket-subject">
          <div class="subject-title">${this.echapper(ticket.titre)}</div>
          <div class="subject-desc">${this.echapper(ticket.description)}</div>
        </td>
        <td class="ticket-requester">
          <div class="requester-avatar" style="background:${avatarColor};color:white">${initiales}</div>
          <span>Utilisateur</span>
        </td>
        <td><span class="priority ${prioriteClass}">${prioriteLabel}</span></td>
        <td><span class="status ${statutClass}">● ${statutLabel}</span></td>
        <td class="ticket-date">${dateFormatee}</td>
        <td>
          <button class="btn-action-menu" data-id="${ticket.id}" data-action="menu">···</button>
        </td>
      </tr>
    `;
    }
    getPrioriteClass(priorite) {
        switch (priorite) {
            case Priorite.Urgent: return "priority--high";
            case Priorite.Moyenne: return "priority--medium";
            case Priorite.Faible: return "priority--low";
            default: return "priority--medium";
        }
    }
    getPrioriteLabel(priorite) {
        switch (priorite) {
            case Priorite.Urgent: return "Élevée";
            case Priorite.Moyenne: return "Moyenne";
            case Priorite.Faible: return "Faible";
            default: return "Moyenne";
        }
    }
    getStatutClass(statut) {
        switch (statut) {
            case Statut.AFaire: return "status--open";
            case Statut.EnCours: return "status--inprogress";
            case Statut.Resolu: return "status--resolved";
            default: return "status--open";
        }
    }
    getStatutLabel(statut) {
        switch (statut) {
            case Statut.AFaire: return "Ouvert";
            case Statut.EnCours: return "En cours";
            case Statut.Resolu: return "Résolu";
            default: return "Ouvert";
        }
    }
    formaterDate(date) {
        const mois = [
            "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
            "Juil", "Août", "Sep", "Oct", "Nov", "Déc"
        ];
        return `${mois[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
    genererInitiales(titre) {
        const mots = titre.trim().split(" ").filter(m => m.length > 0);
        const premier = mots[0];
        const deuxieme = mots[1];
        if (premier && deuxieme) {
            const char1 = premier[0];
            const char2 = deuxieme[0];
            if (char1 && char2) {
                return (char1 + char2).toUpperCase();
            }
        }
        if (premier && premier.length >= 2) {
            const char1 = premier[0];
            const char2 = premier[1];
            if (char1 && char2) {
                return (char1 + char2).toUpperCase();
            }
        }
        if (premier) {
            const char1 = premier[0];
            if (char1) {
                return (char1 + char1).toUpperCase();
            }
        }
        return "XX";
    }
    genererCouleurAvatar(id) {
        const couleurs = [
            "#4F46E5", "#7C3AED", "#059669", "#D97706",
            "#DC2626", "#2563EB", "#9333EA", "#0891B2"
        ];
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }
        return couleurs[Math.abs(hash) % couleurs.length];
    }
    echapper(texte) {
        const div = document.createElement("div");
        div.textContent = texte;
        return div.innerHTML;
    }
    bindEvents(onTraiter, onTerminer, onSupprimer) {
        this.container.addEventListener("click", (e) => {
            const target = e.target;
            const id = target.dataset.id;
            switch (target.dataset.action) {
                case "traiter":
                    if (id)
                        onTraiter(id);
                    break;
                case "terminer":
                    if (id)
                        onTerminer(id);
                    break;
                case "supprimer":
                    if (id && confirm("Êtes-vous sûr de vouloir supprimer ce ticket ?")) {
                        onSupprimer(id);
                    }
                    break;
                case "menu":
                    console.log("Menu ticket:", id);
                    break;
            }
        });
    }
}
//# sourceMappingURL=TicketList.js.map