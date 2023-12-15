import axios, {type AxiosInstance, type AxiosResponse} from "axios";

const axiosAPI: AxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/admin/api/",
});

export type APIType = {
    get: (url: string, data?: object, auth_token?: string) => Promise<any>,
    post: (url: string, data?: object, auth_token?: string) => Promise<any>,
    patch: (url: string, data?: object, auth_token?: string) => Promise<any>,
    deleteItem: (url: string, auth_token?: string) => Promise<any>,
}

const APIRequest = async (method: string, url: string, params?: object,  data?: object, auth_token?: string): Promise<AxiosResponse<any>> => {
    return await axiosAPI(
        {
            url: url,
            method: method,
            data: data,
            params: params,
            headers: {
                authorization: auth_token ? `Bearer ${auth_token}` : null,
                httpVersion: '2.0',
            }
        }
    )
};

const get = (url: string, data?: object, auth_token?: string) => APIRequest("get", url, data, undefined, auth_token);
const post = (url: string, data?: object, auth_token?: string) => APIRequest("post", url, undefined, data, auth_token);
const patch = (url: string, data?: object, auth_token?: string) => APIRequest("patch", url, undefined, data, auth_token);
const deleteItem = (url: string, auth_token?: string) => APIRequest("delete", url, undefined, undefined, auth_token);

export const API: APIType = {
    get: get,
    post: post,
    patch: patch,
    deleteItem: deleteItem,
}
