import type { Observable } from "../services/Observer.ts";
import type { ShoppingItem } from "../models/ShoppingItem.ts";
import { StateFactory } from "../services/state/StateFactory.ts";
import type { CommandManager } from "../services/CommandManager.ts";
import { ChangeItemStateCommand } from "../patterns/ChangeItemStateCommand.ts";
import { ItemComponent } from "./components/ItemComponent.ts";
import { RemoveItemCommand } from "../patterns/RemoveItemCommand.ts";

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
        this.listElement.innerHTML = '';

        const sortedItems = this.items.getData().sort((a, b) => {
            if ('isPriority' in a && (a as any).isPriority()) return -1;
            if ('isPriority' in b && (b as any).isPriority()) return 1;
            return 0;
        });

        sortedItems.forEach((item) => {
            if (item.getState().name === 'Removed') return;

            const listItem = ItemComponent.createItemElement(
                item,
                () => {
                    const command = new ChangeItemStateCommand(this.items, item, StateFactory.getState('Purchased'));
                    this.commandManager.executeCommand(command);
                },
                () => {
                    const command = new RemoveItemCommand(this.items, item);
                    this.commandManager.executeCommand(command);
                }
            );

            this.listElement.appendChild(listItem);
        });
    }
}
