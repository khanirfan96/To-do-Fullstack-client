import { GYM_API_URL } from "../utils/api_url";
import { TODO_API_URL } from "../utils/api_url";
import axiosInstance from "../utils/axiosinstance";
import { GetCallParams, Changepassword } from "./types";


export const getCall = async ({ url }: GetCallParams) => {
    try {
        const response = await axiosInstance.get(GYM_API_URL + url);
        return response.data;
    } catch (error: any) {
        console.error('API call failed:', error.response?.data || error.message);
        return [];
    }
}

export const putCall = async ({ url, id, data }: Changepassword) => {
    try {
        const response = await axiosInstance.put(TODO_API_URL + url + id, data);
        return response;
    } catch (error: any) {
        console.error('API Call failed:', error.response?.data || error.message);
        return null
    }
}