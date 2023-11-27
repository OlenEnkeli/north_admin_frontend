import {API} from "./api";
import {addError} from "../store/errors";

export type APITokens = {
    accessToken: string;
    refreshToken: string;
}

export type User = {
    id: number;
    login: string;
    fullName: string;
}

interface AuthAPI {
    login: (login: string, password: string) => Promise<APITokens | null>,
    currentUser: (auth_token: string) => Promise<User | null>;
}

const login = async (login: string, password: string): Promise<APITokens | null> => {
    let response;

    try {
        response = await API.post("/auth/login", {login: login, password: password});
    } catch (error) {
        addError('Unable to login: wrong login or password.');
        return null;
    }

    try {
        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
        }
    } catch (error) {
        addError(`Unable to login: parse error - ${error}`);
    }
};

const currentUser = async (auth_token: string): Promise<User | null> => {
    let response;

    try {
        response = await API.get("/auth/users/current", undefined, auth_token);
    } catch (error) {
        addError(`Unable to get current user: ${error}`);
        return null;
    }

    try {
        return {
            id: response.data.id,
            login: response.data.login,
            fullName: response.data.fullname,
        }
    } catch (error) {
        addError(`Unable to get current user: parse error - ${error}`);
    }
};

export const authAPI: AuthAPI = {
    login: login,
    currentUser: currentUser,
}

