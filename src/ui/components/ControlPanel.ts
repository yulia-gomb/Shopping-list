export class ControlPanel {
    static createControls(onUndo: () => void, onRedo: () => void): HTMLElement {
        const container = document.createElement('div');
        container.classList.add('control-panel');

        const undoButton = document.createElement('button');
        undoButton.textContent = 'Undo';
        undoButton.classList.add('undo-button');
        undoButton.onclick = onUndo;

        const redoButton = document.createElement('button');
        redoButton.textContent = 'Redo';
        redoButton.classList.add('redo-button');
        redoButton.onclick = onRedo;

        container.appendChild(undoButton);
        container.appendChild(redoButton);

        return container;
    }
}
