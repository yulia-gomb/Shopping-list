type Observer = () => void;

export class Observable<T> {
    private observers: Observer[] = [];
    private data: T;

    constructor(initialData: T) {
        this.data = initialData;
    }

    subscribe(observer: Observer): void {
        this.observers.push(observer);
    }

    notify(): void {
        this.observers.forEach((observer) => observer());
    }

    // Set the data and notify observers
    setData(newData: T): void {
        this.data = newData;
        this.notify();
    }

    // Get the current data
    getData(): T {
        return this.data;
    }
}
