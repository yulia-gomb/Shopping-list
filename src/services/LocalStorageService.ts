import type { ShoppingItem } from "../models/ShoppingItem.ts";

export class LocalStorageService {
    private static storageKey = 'shoppingList';

    static save(items: ShoppingItem[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }

    static load(): ShoppingItem[] {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }
}
