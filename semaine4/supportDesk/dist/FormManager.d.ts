import type { Ticket } from "./Ticket";
export declare class FormManager {
    private form;
    private inputTitre;
    private inputDescription;
    private selectPriorite;
    private modalOverlay;
    private btnOpenModal;
    private btnCloseModal;
    private btnCancelModal;
    constructor();
    private openModal;
    private closeModal;
    private resetForm;
    onSubmit(callback: (ticket: Ticket) => void): void;
}
//# sourceMappingURL=FormManager.d.ts.map