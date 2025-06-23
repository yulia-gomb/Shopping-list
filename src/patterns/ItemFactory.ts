import type { ShoppingItem } from "../models/ShoppingItem.ts";
import { RegularItem } from "../models/RegularItem.ts";

export abstract class ItemFactory {
    abstract createItem(
        name: string,
        quantity: number,
        category: string
    ): ShoppingItem;
}

export class RegularItemFactory extends ItemFactory {
    createItem(name: string, quantity: number, category: string): ShoppingItem {
        return new RegularItem(name, quantity, category);
    }
}