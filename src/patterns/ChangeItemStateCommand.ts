import type { Command } from "./Command.ts";
import type { Observable } from "../services/Observer.ts";
import type { ShoppingItem } from "../models/ShoppingItem.ts";
import type { State } from "../models/State.ts";
import { LocalStorageService } from "../services/storage/LocalStorageService.ts";


export class ChangeItemStateCommand implements Command {
    private shoppingList: Observable<ShoppingItem[]>;
    private item: ShoppingItem;
    private readonly newState: State;
    private readonly previousState: State;

    constructor(shoppingList: Observable<ShoppingItem[]>, item: ShoppingItem, newState: State) {
        this.shoppingList = shoppingList;
        this.item = item;
        this.newState = newState;
        this.previousState = item.getState(); // Save the current state before change
    }

    execute(): void {
        this.item.setState(this.newState); // Change to the new state
        LocalStorageService.save(this.shoppingList.getData()); // Save updated list to LocalStorage
        this.shoppingList.notify(); // Update UI
    }

    undo(): void {
        this.item.setState(this.previousState); // Revert to the previous state
        LocalStorageService.save(this.shoppingList.getData()); // Save reverted list to LocalStorage
        this.shoppingList.notify(); // Update UI
    }
}
