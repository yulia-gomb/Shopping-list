import { ActiveState, PurchasedState, RemovedState, type State } from "../../models/State.ts";

export class StateFactory {
    private static stateMap: Map<string, new () => State> = new Map([
        ['Active', ActiveState],
        ['Purchased', PurchasedState],
        ['Removed', RemovedState],
    ]);

    static getState(stateName: string): State {
        const StateClass = this.stateMap.get(stateName);
        if (!StateClass) {
            throw new Error(`State "${stateName}" is not recognized. Available states: ${Array.from(this.stateMap.keys()).join(', ')}`);
        }
        return new StateClass();
    }
}
