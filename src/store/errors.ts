import {type Writable, writable} from "svelte/store";

export const errors: Writable<string[]> = writable([]);

export const addError = (origin: string): void => {
    let currentErrors: string[]
    errors.subscribe((errors: string[]) => {currentErrors = errors});
    errors.set([...currentErrors, origin])
};

export const removeError = (index: number ): void => {
    let currentErrors: string[]
    errors.subscribe((errors: string[]) => {currentErrors = errors});
    currentErrors.splice(index, 1)
    errors.set(currentErrors)
};
