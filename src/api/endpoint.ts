import {API} from "./api";
import {addError} from "../store/errors";

export type ListItems = {
    page: number;
    paginationSize: number;
    currentPageAmount: number;
    totalAmount: number;
    pagesAmount: number;
    items: object[];
}

interface EndpointAPI {
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
    // get: () => Promise<object | null>;
}

const list = async (
    model: string,
    auth_token: string,
    softDeleteIncluded: boolean,
    page: number,
    pageSize: number,
    sortAsc: number,
    sortByAsc: boolean,
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
        addError(`Unable to get ${model} list: ${error}`);
        return null;
    }

    try {
        return {
            page: response.data.page,
            paginationSize: response.data.pagination_size,
            currentPageAmount: response.data.current_page_amount,
            totalAmount: response.data.total_amount,
            items: response.data.items,
            pagesAmount: response.data.pages_amount,
        }
    } catch (error) {
        addError(`Unable to get ${model} list: parse error - ${error}`);
    }
}

export const endpointAPI: EndpointAPI = {
  list: list,
};