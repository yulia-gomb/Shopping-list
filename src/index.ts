import './style.css'
import { RegularItemFactory } from "./patterns/ItemFactory.ts";
import { LocalStorageService } from "./services/LocalStorageService.ts";

// Create a factory for regular items
const factory = new RegularItemFactory();

// Load existing items from LocalStorage
const shoppingList = LocalStorageService.load();

// Add a new item to the list
const newItem = factory.createItem('Apples', 5, 'Fruits');
shoppingList.push(newItem);

// Save updated list to LocalStorage
LocalStorageService.save(shoppingList);

console.log('Shopping list updated:', shoppingList);


