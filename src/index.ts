import './style.css'
import { RegularItemFactory } from "./patterns/ItemFactory.ts";
import { LocalStorageService } from "./services/LocalStorageService.ts";
import { Observable } from "./services/Observer.ts";
import { UIService } from "./ui/UIService.ts";
import { categories } from './data/categories';
import { CommandManager } from "./services/CommandManager.ts";
import { AddItemCommand } from "./patterns/AddItemCommand.ts";

// render category options
const renderCategoryOptions = (categories: string[], selectElement: HTMLSelectElement): void => {
    selectElement.innerHTML = '';
    categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        selectElement.appendChild(option);
    });
};

// Load shopping list data from LocalStorage
const initialData = LocalStorageService.load();
const shoppingList = new Observable(initialData);

// Initialize UI
const listContainerId = 'shopping-list';
new UIService(listContainerId, shoppingList);

// Create a factory for generating shopping items
const factory = new RegularItemFactory();

// Initialize CommandManager for Undo/Redo functionality
const commandManager = new CommandManager();

// Add a new item to the shopping list via CommandManager
const addItem = (name: string, quantity: number, category: string): void => {
    const newItem = factory.createItem(name, quantity, category);

    // Execute Add Item
    const command = new AddItemCommand(shoppingList, newItem);
    commandManager.executeCommand(command);
};

// Render category options
document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('item-category') as HTMLSelectElement;

    if (categorySelect) {
        renderCategoryOptions(categories, categorySelect); // Render category options in the dropdown
    }
});

// Handle the Add Item
document.getElementById('add-item-btn')?.addEventListener('click', () => {
    const nameInput = document.getElementById('item-name') as HTMLInputElement;
    const quantityInput = document.getElementById('item-quantity') as HTMLInputElement;
    const categorySelect = document.getElementById('item-category') as HTMLSelectElement;

    const name = nameInput.value;
    const quantity = Number(quantityInput.value);
    const category = categorySelect.value;

    if (name && quantity && category) {
        // Add the new item
        addItem(name, quantity, category);

        // Clear the input fields after adding the item
        nameInput.value = '';
        quantityInput.value = '';
        categorySelect.selectedIndex = 0;
    }
});

// Undo/Redo functionality
document.getElementById('undo-button')?.addEventListener('click', () => {
    commandManager.undo();
});

document.getElementById('redo-button')?.addEventListener('click', () => {
    commandManager.redo();
});

shoppingList.notify();
