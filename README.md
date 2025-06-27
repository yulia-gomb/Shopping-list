# Shopping List Application

## 📋 Description

Shopping List Application is a simple and powerful tool for managing your shopping list. The application focuses on providing modern features such as undo/redo functionality, dynamic sorting, and prioritization of important items. It ensures seamless user experience through a well-structured UI and reactive data updates.

---

## 🛠 Features

- Add items with name, quantity, category, and priority settings.
- Mark items as purchased or remove them from the list.
- Automatically saves and restores the shopping list using LocalStorage.
- Undo/redo functionality for easy recovery of previous actions.
- Highlighting priority items to make them visually noticeable.
- Dynamic sorting to keep priority items at the top of your list.

---

## 📐 Design Patterns Used

### 1. Factory Method
Enables easy creation of different types of objects (e.g., `ShoppingItem`, `State`) without relying on specific classes. Boosts extensibility when new types are introduced.

### 2. State
Simplifies behavior management by encapsulating the item's state (e.g., "Active", "Purchased"). Each state has its unique behavior, improving scalability.

### 3. Observer
Ensures reactivity by synchronizing changes in the shopping list with the application's UI. Helps maintain a dynamic interface.

### 4. Command
Encapsulates user actions as "commands" with undo/redo capabilities. Ensures a robust interaction system while tracking the history of actions.

### 5. Decorator
Adds priority functionality to items by wrapping them in `PrioritizedItem`. Allows extending capabilities without modifying the base class.

---
## 🔨 Technologies Used

- TypeScript
- HTML/CSS
- LocalStorage API
- Design Patterns: Factory Method, State, Observer, Command, Decorator

---
