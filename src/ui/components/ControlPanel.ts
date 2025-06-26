export class ControlPanel {
    static createControls(onUndo: () => void, onRedo: () => void): HTMLElement {
        const container = document.createElement('div');

        const undoButton = document.createElement('button');
        undoButton.textContent = 'Undo';
        undoButton.onclick = onUndo;

        const redoButton = document.createElement('button');
        redoButton.textContent = 'Redo';
        redoButton.onclick = onRedo;

        container.appendChild(undoButton);
        container.appendChild(redoButton);

        return container;
    }
}
