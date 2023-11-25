import {type Writable, writable} from "svelte/store";

type User = {
    id: number;
    login: string;
    fullName: string;
}

export const user: Writable<User | null> = writable(null);

export const checkAuth = async (): Promise<void> => {
    user.set(
        {
            id: 1,
            fullName: "Aaaa",
            login: "aaaa",
        }
    );
    await new Promise(resolve => {resolve()});
};

export const login = async (login: string, password: string): Promise<void> => {
    user.set(
        {
            id: 1,
            fullName: "Aaaa",
            login: "aaaa",
        }
    );
    await new Promise(resolve => {resolve()});
};

export const logout = async (): Promise<void> => {
    user.set(null);
    await new Promise(resolve => {resolve()});
}
