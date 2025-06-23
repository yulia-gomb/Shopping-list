import './style.css'
import { RegularItemFactory } from "./patterns/ItemFactory.ts";
import { LocalStorageService } from "./services/LocalStorageService.ts";
import {Observable} from "./services/Observer.ts";
import {UIService} from "./ui/UIService.ts";

const initialData = LocalStorageService.load();
const shoppingList = new Observable(initialData);

const listContainerId = 'shopping-list';
new UIService(listContainerId, shoppingList);

const factory = new RegularItemFactory();

const addItem = (name: string, quantity: number, category: string): void => {
    const newItem = factory.createItem(name, quantity, category);
    const updatedList = [...shoppingList.getData(), newItem];
    shoppingList.setData(updatedList);
    LocalStorageService.save(updatedList);
};

document.getElementById('add-item-btn')?.addEventListener('click', () => {
    const name = (document.getElementById('item-name') as HTMLInputElement)?.value;
    const quantity = Number(
        (document.getElementById('item-quantity') as HTMLInputElement)?.value
    );
    const category = (document.getElementById('item-category') as HTMLInputElement)
        ?.value;

    if (name && quantity && category) {
        addItem(name, quantity, category);

        (document.getElementById('item-name') as HTMLInputElement).value = '';
        (document.getElementById('item-quantity') as HTMLInputElement).value = '';
        (document.getElementById('item-category') as HTMLInputElement).value = '';
    }
});

shoppingList.notify();
