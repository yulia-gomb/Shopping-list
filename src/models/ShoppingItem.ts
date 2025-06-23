import type { State } from "./State.ts";

export interface ShoppingItem {
    id: string;
    name: string;
    quantity: number;
    category: string;
    state: State;

    setState(state: State): void;
    getState(): State;
}
