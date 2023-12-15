import {API} from "./api";
import {alertStore} from "../store/alert";

export type ListItems = {
    page: number;
    paginationSize: number;
    currentPageAmount: number;
    totalAmount: number;
    pagesAmount: number;
    items: object[];
}

export type EndpointAPI = {
    list: (
        model: string,
        auth_token: string,
        softDeleteIncluded: boolean,
        page: number,
        pageSize: number,
        sortAsc: boolean,
        sortBy?: string,
        filters?: object,
    ) => Promise<ListItems | null>;
}

const list = async (
    model: string,
    auth_token: string,
    softDeleteIncluded: boolean,
    page: number,
    pageSize: number,
    sortAsc: number,
    sortBy?: string,
    filters?: object,
): Promise<ListItems | null> => {
    let response;

    try {
        response = await API.get(
            `/${model}/`,
            {
                soft_deleted_included: softDeleteIncluded,
                filters: '{}',
                page: page,
                pagination_size: pageSize,
                sort_by: sortBy,
                sort_asc: sortAsc,
            },
            auth_token,
        );
    } catch (error) {
        alertStore.add({
            type: 'error',
            message:`Unable to get ${model} list: ${error}`,
        });
        return null;
    }

    try {
        return {
            page: response.data.page,
            paginationSize: response.data.pagination_size,
            currentPageAmount: response.data.current_page_amount,
            totalAmount: response.data.total_amount,
            pagesAmount: response.data.pages_amount,
            items: response.data.items,
        }
    } catch (error) {
        alertStore.add({
            type: 'error',
            message:`Unable to get ${model} list: parse error - ${error}`,
        });
    }
}

export const endpointAPI: EndpointAPI = {
    list: list,
};
