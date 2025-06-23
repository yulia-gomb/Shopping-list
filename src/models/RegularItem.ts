import type { ShoppingItem } from "./ShoppingItem.ts";
import { ActiveState, type State } from "./State.ts";


export class RegularItem implements ShoppingItem {
    id: string;
    name: string;
    quantity: number;
    category: string;
    state: State;

    constructor(name: string, quantity: number, category: string) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.quantity = quantity;
        this.category = category;
        this.state = new ActiveState(); // Default state "Active"
    }

    setState(state: State): void {
        this.state = state;
    }

    getState(): State {
        return this.state;
    }
}