import {API} from "./api";
import {alertStore} from "../store/alert";

export type AdminInfo = {
    [index: string]: AdminModel;
}

export type AdminModel = {
    title: string;
    emoji: string;
    pkeyColumn: string;
    softDeleteColumn: string,
    filters: Filter[],
    getColumns: Column[];
    listColumns: Column[];
    createColumns: Column[];
    updateColumns: Column[];
    deleteColumns: Column[];
    softDeleteColumns: Column[];
    columns: object;
}

export type Filter = {
    title: string;
    fieldType: string;
}

export type Column = {
    title: string;
    columnType: string;
    nullable: boolean;
    sortable: boolean;
}

interface AdminInfoAPI {
    info: () => Promise<AdminInfo | null>;
}

const info = async (): Promise<AdminInfo | null> => {
    let response;
    let result: {} = {};

    try {
        response = await API.get("/", undefined);
    } catch (error) {
        alertStore.add({
            type: 'error',
            message: `Unable to get info about admin API: ${error}`,
        });
        return null;
    }

    try {
        for (const key in response.data) {
            let adminModel: AdminModel = {
                title: response.data[key].title,
                emoji: response.data[key].emoji,
                pkeyColumn: response.data[key].pkey_column,
                softDeleteColumn: response.data[key].soft_delete_column,
                filters: [],
                getColumns: [],
                listColumns: [],
                createColumns: [],
                updateColumns: [],
                deleteColumns: [],
                softDeleteColumns: [],
                columns: {},
            }

            for (const i in response.data[key].filters) {
                let currentFilter: Filter = {
                    title: response.data[key].filters[i].title,
                    fieldType: response.data[key].filters[i].title
                };
                adminModel.filters.push(currentFilter)
            }

            for (const columnName in response.data[key].columns) {
                let currentColumn: Column = {
                    title: columnName,
                    columnType: response.data[key].columns[columnName].column_type,
                    nullable: response.data[key].columns[columnName].nullable,
                    sortable: response.data[key].columns[columnName].is_sortable,
                };

                if (response.data[key].columns[columnName].is_get_available)
                    adminModel.getColumns.push(currentColumn);

                if (response.data[key].columns[columnName].is_list_available)
                    adminModel.listColumns.push(currentColumn);

                if (response.data[key].columns[columnName].is_update_available)
                    adminModel.updateColumns.push(currentColumn);

                if (response.data[key].columns[columnName].is_delete_available)
                    adminModel.deleteColumns.push(currentColumn);

                if (response.data[key].columns[columnName].is_soft_delete_available)
                    adminModel.softDeleteColumn.push(currentColumn);

                adminModel.columns[columnName] = currentColumn;
            }

            result[key] = adminModel;
        }
    } catch (error) {
        alertStore.add({
            type: 'error',
            message: `Unable to get info about admin API: parse error - ${error}`,
        });
    }

    return result;
};

export const adminInfoAPI: AdminInfoAPI = {
    info: info,
}