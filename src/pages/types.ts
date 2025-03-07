export interface GetCallParams {
    url: string;
}

export interface PostData {
    [key: string]: any;
}

export interface TodoPayload {
    task: string;
}

export interface CaloriePayload {
    calories?: number;
    dish?: string;
    fat?: number;
    ingredients: string;
}

export interface Changepassword {
    url:string;
    id:string;
    data:any;
}