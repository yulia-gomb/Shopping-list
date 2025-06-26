import type { ShoppingItem } from "../models/ShoppingItem.ts";


export class PrioritizedItem implements ShoppingItem {
    private baseItem: ShoppingItem;
    priority: boolean;

    constructor(baseItem: ShoppingItem, priority: boolean = true) {
        this.baseItem = baseItem;
        this.priority = priority;
    }

    // Delegate properties and methods to the base item
    get id() {
        return this.baseItem.id;
    }

    get name() {
        return this.baseItem.name;
    }

    get quantity() {
        return this.baseItem.quantity;
    }

    get category() {
        return this.baseItem.category;
    }

    get state() {
        return this.baseItem.state;
    }

    setState(state: typeof this.baseItem.state) {
        return this.baseItem.setState(state);
    }

    getState() {
        return this.baseItem.getState();
    }

    isPriority(): boolean {
        return this.priority;
    }
}
