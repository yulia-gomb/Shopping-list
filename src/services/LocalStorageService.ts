import type { ShoppingItem } from "../models/ShoppingItem.ts";
import { RegularItem } from "../models/RegularItem.ts";
import { StateFactory } from "../factories/StateFactory.ts";
import { PrioritizedItem } from "../decorators/PrioritizedItem.ts";

export class LocalStorageService {
    private static storageKey = 'shoppingList';

    static save(items: ShoppingItem[]): void {
        const serializedItems = items.map((item) => {
            // Check if item is wrapped with `PrioritizedItem`
            const isPriority = 'isPriority' in item && (item as any).isPriority();

            return {
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                category: item.category,
                state: item.state.name,
                priority: isPriority,
            };
        });

        localStorage.setItem(this.storageKey, JSON.stringify(serializedItems));
    }

    // Load shopping list from LocalStorage
    static load(): ShoppingItem[] {
        const data = localStorage.getItem(this.storageKey);
        if (!data) return [];

        const parsed = JSON.parse(data);

        return parsed.map((item: any) => {
            // Create a regular item
            const baseItem = new RegularItem(
                item.name,
                item.quantity,
                item.category,
                item.state
            );
            baseItem.setState(StateFactory.getState(item.state));

            // Wrap the item in `PrioritizedItem` if it's marked as priority
            if (item.priority) {
                return new PrioritizedItem(baseItem, true);
            }

            return baseItem;
        });
    }
}