import { Observable } from '../services/Observer';
import { LocalStorageService } from '../services/LocalStorageService';
import type { Command } from "./Command.ts";
import type { ShoppingItem } from "../models/ShoppingItem.ts";

export class AddItemCommand implements Command {
    private shoppingList: Observable<ShoppingItem[]>;
    private readonly item: ShoppingItem;

    constructor(shoppingList: Observable<ShoppingItem[]>, item: ShoppingItem) {
        this.shoppingList = shoppingList;
        this.item = item;
    }

    execute(): void {
        const updatedList = [...this.shoppingList.getData(), this.item];
        this.shoppingList.setData(updatedList);
        LocalStorageService.save(updatedList);
    }

    undo(): void {
        const updatedList = this.shoppingList.getData().filter((i) => i.id !== this.item.id);
        this.shoppingList.setData(updatedList);
        LocalStorageService.save(updatedList);
    }
}
