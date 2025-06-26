import type { ShoppingItem } from "../../models/ShoppingItem.ts";

export class ItemComponent {
    static createItemElement(
        item: ShoppingItem,
        onPurchase: () => void,
        onRemove: () => void
    ): HTMLElement {
        // Create the list item element
        const listItem = document.createElement('li');

        // Apply style for "Purchased"
        if (item.getState().name === 'Purchased') {
            listItem.style.textDecoration = 'line-through';
        }

        // Highlight prioritized items
        if ('isPriority' in item && (item as any).isPriority()) {
            listItem.style.color = 'red'; // Set text color for priority items
            listItem.style.fontWeight = 'bold'; // Make the text bold
            listItem.textContent = `⭐ ${item.name} (${item.quantity}) - ${item.category}`;
        } else {
            listItem.textContent = `${item.name} (${item.quantity}) - ${item.category}`;
        }

        // Add buttons
        const purchaseButton = document.createElement('button');
        purchaseButton.textContent = 'Purchased';
        purchaseButton.onclick = onPurchase;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = onRemove;

        listItem.appendChild(purchaseButton);
        listItem.appendChild(removeButton);

        return listItem;
    }
}
