import type {Observable} from "../services/Observer.ts";
import type {ShoppingItem} from "../models/ShoppingItem.ts";
import {LocalStorageService} from "../services/LocalStorageService.ts";
import {StateFactory} from "../factories/StateFactory.ts";

export class UIService {
    private listElement: HTMLElement;
    private items: Observable<ShoppingItem[]>;

    constructor(listElementId: string, items: Observable<ShoppingItem[]>) {
        this.listElement = document.getElementById(listElementId) as HTMLElement;
        this.items = items;

        this.items.subscribe(() => this.render());
    }

    render(): void {
        this.listElement.innerHTML = '';

        const items = this.items.getData();

        items.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} (${item.quantity}) - ${item.category}`;

            // Button: Mark as Purchased
            const purchaseButton = document.createElement('button');
            purchaseButton.textContent = 'Куплено';
            purchaseButton.onclick = () => {
                item.setState(StateFactory.getState('Purchased')); // Use StateFactory
                LocalStorageService.save(items);
                this.items.notify();
            };

            // Button: Remove
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Удалить';
            removeButton.onclick = () => {
                item.setState(StateFactory.getState('Removed')); // Use StateFactory
                const updatedItems = items.filter((i) => i.id !== item.id);
                this.items.setData(updatedItems);
                LocalStorageService.save(updatedItems);
            };

            listItem.appendChild(purchaseButton);
            listItem.appendChild(removeButton);
            this.listElement.appendChild(listItem);
        });
    }
}
