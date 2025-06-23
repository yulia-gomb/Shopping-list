export interface State {
    name: string;
    handle(): void;
}

export class ActiveState implements State {
    name = 'Active';

    handle(): void {
        console.log('Item is in an active state.');
    }
}

export class PurchasedState implements State {
    name = 'Purchased';

    handle(): void {
        console.log('Item has been purchased.');
    }
}

export class RemovedState implements State {
    name = 'Removed';

    handle(): void {
        console.log('Item has been removed.');
    }
}
