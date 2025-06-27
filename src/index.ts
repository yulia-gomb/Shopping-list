import { RegularItemFactory } from "./patterns/ItemFactory.ts";
import { LocalStorageService } from "./services/storage/LocalStorageService.ts";
import { Observable } from "./services/Observer.ts";
import { UIService } from "./ui/UIService.ts";
import { CommandManager } from "./services/CommandManager.ts";
import { AddItemCommand } from "./patterns/AddItemCommand.ts";
import { PrioritizedItem } from "./decorators/PrioritizedItem.ts";
import { CategoryService } from "./services/CategoryService.ts";
import { ControlPanel } from "./ui/components/ControlPanel.ts";

// Function to dynamically render category options
const renderCategoryOptions = (categories: string[], selectElement: HTMLSelectElement): void => {
    selectElement.innerHTML = ''; // Clear any existing options
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

// Initialize CommandManager
const commandManager = new CommandManager();

// Initialize UI
const listContainerId = 'shopping-list';
new UIService(listContainerId, shoppingList, commandManager);

// Create a factory for generating shopping items
const factory = new RegularItemFactory();

// Add a new item to the shopping list via CommandManager
const addItem = (name: string, quantity: number, category: string, isPriority: boolean): void => {
    const newItem = factory.createItem(name, quantity, category);

    // Wrap the item in `PrioritizedItem` if it's priority
    const finalItem = isPriority ? new PrioritizedItem(newItem, true) : newItem;

    const command = new AddItemCommand(shoppingList, finalItem);
    commandManager.executeCommand(command);
};

// Render category options and initialize ControlPanel
document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('item-category') as HTMLSelectElement;

    if (categorySelect) {
        renderCategoryOptions(CategoryService.getCategories(), categorySelect);
    }

    // Initialize the ControlPanel to handle Undo/Redo
    const controlPanel = ControlPanel.createControls(
        () => commandManager.undo(),
        () => commandManager.redo()
    );

    // Check if #shopping-list exists and insert controlPanel before it
    const shoppingListContainer = document.getElementById('shopping-list');
    if (shoppingListContainer && shoppingListContainer.parentNode) {
        shoppingListContainer.parentNode.insertBefore(controlPanel, shoppingListContainer);
    } else {
        console.error('Shopping list container (#shopping-list) not found.');
    }
});

// Handle the "Add Item" button logic
document.getElementById('add-item-btn')?.addEventListener('click', () => {
    const nameInput = document.getElementById('item-name') as HTMLInputElement;
    const quantityInput = document.getElementById('item-quantity') as HTMLInputElement;
    const categorySelect = document.getElementById('item-category') as HTMLSelectElement;
    const isPriorityCheckbox = document.getElementById('item-priority') as HTMLInputElement;

    const name = nameInput.value;
    const quantity = Number(quantityInput.value);
    const category = categorySelect.value;
    const isPriority = isPriorityCheckbox.checked;

    if (name && quantity && category) {
        // Add the new item to the shopping list
        addItem(name, quantity, category, isPriority);

        // Clear the input fields after adding the item
        nameInput.value = '';
        quantityInput.value = '';
        categorySelect.selectedIndex = 0;
        isPriorityCheckbox.checked = false;
    }
});

shoppingList.notify();
