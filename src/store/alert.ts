import {type Writable, writable} from "svelte/store";

export type Alert = {
    type: string,
    message: string,
};

export type AlertStore = {
    get: () => Alert[],
    add: (alert: Alert) => void,
    remove: (index: number) => void,
};

export const alerts: Writable<Alert[]> = writable([]);

const get = (): Alert[] => {
    let currentAlerts: Alert[];
    alerts.subscribe((gettedAlerts: Alert[]) => {currentAlerts = gettedAlerts});
    return currentAlerts;
}

const add = (alert: Alert): void => {
    alerts.set([...get(), alert]);
    console.log(origin);
};

const remove = (index: number ): void => {
    let currentAlerts: Alert[] = get();
    currentAlerts.splice(index, 1)
    alerts.set(currentAlerts);
};

export const alertStore: AlertStore = {
    get: get,
    add: add,
    remove: remove,
}