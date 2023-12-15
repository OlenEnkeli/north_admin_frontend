import {getCookie, setCookie, deleteCookie} from "svelte-cookie";
import {type Writable, writable} from "svelte/store";
import {authAPI, type APITokens, type User} from "../api/auth";

export const user: Writable<User | null> = writable(null);
export const tokens: Writable<APITokens | null> = writable(null);

export type AuthStore = {
    check: () => Promise<undefined>;
    login: (login: string, password: string) => Promise<User | null>;
    logout: () => Promise<void>
}

const check = async (): Promise<undefined> => {
    let accessToken = getCookie("accessToken");
    let refreshToken = getCookie("refreshToken");

    if (accessToken === "")
        return;

    tokens.set({
        accessToken: accessToken,
        refreshToken: refreshToken,
    });

    let currentUser: User | null = await authAPI.currentUser(accessToken);
    if (currentUser)
        user.set(currentUser);
};

const login = async (login: string, password: string): Promise<User | null> => {
    let tokens: APITokens | null = await authAPI.login(login, password);
    if (!tokens) {
        return;
    }

    setCookie("accessToken", tokens.accessToken);
    setCookie("refreshToken", tokens.refreshToken);

    let currentUser: User | null = await authAPI.currentUser(tokens.accessToken);
    if (currentUser)
        user.set(currentUser);

    return currentUser;
};

const logout = async (): Promise<void> => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");

    user.set(null);
    await new Promise(resolve => {resolve()});
}

export const authStore: AuthStore = {
    check: check,
    login: login,
    logout: logout,
};