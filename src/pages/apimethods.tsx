import { GYM_API_URL } from "../utils/api_url";
import axios from 'axios';
import {GetCallParams} from "./types";


export const getCall = async ({ url }: GetCallParams) => {
    const token =  JSON.parse(sessionStorage.getItem('auth-storage') || '{}')?.state?.token    
    try {
        const response = await axios.get(GYM_API_URL + url, {
            headers: {
                token: token
            }
        });
        return response.data;
    } catch (error: any) {
        console.error('API call failed:', error.response?.data || error.message);
        return [];
    }
}