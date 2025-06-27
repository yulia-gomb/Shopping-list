import type { ShoppingItem } from "../../models/ShoppingItem.ts";

export class ItemComponent {
    static createItemElement(
        item: ShoppingItem,
        onPurchase: () => void,
        onRemove: () => void
    ): HTMLElement {
        const listItem = document.createElement('li');

        const itemText = document.createElement('span');

        if (item.getState().name === 'Purchased') {
            itemText.style.textDecoration = 'line-through';
            itemText.style.color = '#999';
        }

        // Highlight prioritized items
        if ('isPriority' in item && (item as any).isPriority()) {
            itemText.style.color = 'red';
            itemText.style.fontWeight = 'bold';
        }

        itemText.textContent = `${item.name} (${item.quantity}) - ${item.category}`;

        // Add buttons for interaction
        const purchaseButton = document.createElement('button');
        purchaseButton.textContent = 'Purchased';
        purchaseButton.classList.add('purchased');
        purchaseButton.onclick = onPurchase;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove');
        removeButton.onclick = onRemove;

        listItem.appendChild(itemText);
        listItem.appendChild(purchaseButton);
        listItem.appendChild(removeButton);

        return listItem;
    }
}
