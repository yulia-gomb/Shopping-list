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
        // Clear the existing list
        this.listElement.innerHTML = '';

        const items = this.items.getData();

        items.forEach((item) => {
            if (item.getState().name === 'Removed') {
                return; // Skip removed items
            }

            const listItem = document.createElement('li');

            // Highlight prioritized items
            if ('isPriority' in item && (item as any).isPriority()) {
                listItem.style.color = 'red'; // Example: red color for priority items
                listItem.textContent = `⭐ ${item.name} (${item.quantity}) - ${item.category} [${item.getState().name}]`;
            } else {
                listItem.textContent = `${item.name} (${item.quantity}) - ${item.category} [${item.getState().name}]`;
            }

            // Add buttons for changing state
            const purchaseButton = document.createElement('button');
            purchaseButton.textContent = 'Purchased';
            purchaseButton.onclick = () => {
                const command = new ChangeItemStateCommand(this.items, item, StateFactory.getState('Purchased'));
                this.commandManager.executeCommand(command);
            };

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
