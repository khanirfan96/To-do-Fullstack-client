import { GYM_API_URL } from "../utils/api_url";
import axios from 'axios';

interface GetCallParams {
    url: string;
}

interface PostData {
    [key: string]: any;
}

interface TodoPayload {
    task: string;
}

interface CaloriePayload {
    calories?: number;
    dish?: string;
    fat?: number;
    ingredients: string;
}

type PayloadType = TodoPayload | CaloriePayload;


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