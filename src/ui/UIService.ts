import type { Observable } from "../services/Observer.ts";
import type { ShoppingItem } from "../models/ShoppingItem.ts";
import { StateFactory } from "../factories/StateFactory.ts";
import type { CommandManager } from "../services/CommandManager.ts";
import { ChangeItemStateCommand } from "../patterns/ChangeItemStateCommand.ts";

export class UIService {
    private listElement: HTMLElement;
    private readonly items: Observable<ShoppingItem[]>;
    private commandManager: CommandManager;

    constructor(listElementId: string, items: Observable<ShoppingItem[]>, commandManager: CommandManager) {
        this.listElement = document.getElementById(listElementId) as HTMLElement;
        this.items = items;
        this.commandManager = commandManager;

        this.items.subscribe(() => this.render());
    }

    render(): void {
        // Clear the current list in the DOM
        this.listElement.innerHTML = '';

        const items = this.items.getData();

        // Loop through items and render them
        items.forEach((item) => {
            // Skip rendering items with state 'Removed'
            if (item.getState().name === 'Removed') {
                return;
            }

            const listItem = document.createElement('li');

            // Apply a strikethrough style if the item's state is 'Purchased'
            if (item.getState().name === 'Purchased') {
                listItem.style.textDecoration = 'line-through';
            }

            listItem.textContent = `${item.name} (${item.quantity}) - ${item.category} [${item.getState().name}]`;

            // Button: Mark as Purchased
            const purchaseButton = document.createElement('button');
            purchaseButton.textContent = 'Purchased';
            purchaseButton.onclick = () => {
                const command = new ChangeItemStateCommand(this.items, item, StateFactory.getState('Purchased'));
                this.commandManager.executeCommand(command);
            };

            // Button: Mark as Removed
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => {
                const command = new ChangeItemStateCommand(this.items, item, StateFactory.getState('Removed'));
                this.commandManager.executeCommand(command);
            };

            listItem.appendChild(purchaseButton);
            listItem.appendChild(removeButton);
            this.listElement.appendChild(listItem);
        });
    }
}
