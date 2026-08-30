import type { Ticket } from "./Ticket";
export declare class DataManager {
    constructor();
    private save;
    getAllTickets(): Ticket[];
    add(ticket: Ticket): void;
    updateTicket(updatedTicket: Ticket): void;
    deleteTicket(id: string): void;
}
//# sourceMappingURL=DataManager.d.ts.map