import type { ShoppingItem } from "../models/ShoppingItem.ts";
import { RegularItem } from "../models/RegularItem.ts";

export class LocalStorageService {
    private static storageKey = 'shoppingList';

    static save(items: ShoppingItem[]): void {
        const serializedItems = items.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            category: item.category,
            state: item.state.name, // Сохраняем только имя состояния
        }));

        localStorage.setItem(this.storageKey, JSON.stringify(serializedItems));
    }

    static load(): ShoppingItem[] {
        const data = localStorage.getItem(this.storageKey);
        if (!data) return [];

        const parsed = JSON.parse(data);
        return parsed.map((item: any) => {
            return new RegularItem(
                item.name,
                item.quantity,
                item.category,
                item.state // Здесь мы правильно передаём имя состояния
            );
        });
    }
}