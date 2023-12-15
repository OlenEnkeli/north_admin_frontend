import {endpointAPI, type ListItems} from "../api/endpoint";
import {tokens} from "./auth";
import type {APITokens} from "../api/auth";

export type EndpointStore = {
    list: (
        model: string,
        softDeleteIncluded: boolean,
        page: number,
        pageSize: number,
        sortAsc: boolean,
        sortBy?: string,
        filters?: object,
    ) => Promise<ListItems | null>,
}

const list = async (
    model: string,
    softDeleteIncluded: boolean,
    page: number,
    pageSize: number,
    sortAsc: boolean,
    sortBy?: string,
    filters?: object,
): Promise<ListItems | null> => {
    let currentTokens: APITokens | null;

    tokens.subscribe((storeTokens): void => {
        currentTokens = storeTokens;
    })

    if (!currentTokens || !currentTokens.accessToken)
        return null;

    return await endpointAPI.list(
        model,
        currentTokens.accessToken,
        softDeleteIncluded,
        page,
        pageSize,
        sortAsc,
        sortBy,
        filters,
    )
}

export const endpointStore: EndpointStore = {
    list: list,
};