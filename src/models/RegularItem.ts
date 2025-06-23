import type { ShoppingItem } from "./ShoppingItem.ts";
import { StateFactory } from "../factories/StateFactory.ts";
import type { State } from "./State.ts";


export class RegularItem implements ShoppingItem {
    id: string;
    name: string;
    quantity: number;
    category: string;
    state: State;

    constructor(
        name: string,
        quantity: number,
        category: string,
        stateName: string = 'Active' // Default state is "Active"
    ) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.quantity = quantity;
        this.category = category;
        this.state = StateFactory.getState(stateName); // Создаём состояние через фабрику
    }

    setState(state: State): void {
        this.state = state;
    }

    getState(): State {
        return this.state;
    }
}
