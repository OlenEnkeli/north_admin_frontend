import { getCookie, setCookie, deleteCookie } from "svelte-cookie";
import {type Writable, writable} from "svelte/store";
import {authAPI, type APITokens, type User} from "../api/auth";

export const user: Writable<User | null> = writable(null);

export const checkAuth = async (): Promise<void> => {
    let accessToken = getCookie("accessToken");
    if (accessToken === "") {
        return
    }

    let currentUser: User | null = await authAPI.currentUser(accessToken);
    if (currentUser) {
        user.set(currentUser)
    }
};

export const login = async (login: string, password: string): Promise<User | null> => {
    let tokens: APITokens | null = await authAPI.login(login, password);
    if (!tokens) {
        return;
    }

    setCookie("accessToken", tokens.accessToken);
    setCookie("refreshToken", tokens.refreshToken);

    let currentUser: User | null = await authAPI.currentUser(tokens.accessToken);
    if (currentUser) {
        user.set(currentUser);
    }

    return currentUser;
};

export const logout = async (): Promise<void> => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");

    user.set(null);
    await new Promise(resolve => {resolve()});
}
