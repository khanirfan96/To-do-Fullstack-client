import { NavigateFunction } from 'react-router-dom';

export type DataType = 'todo' | 'calorie';

export interface User {
    id: string;
    email: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface SignupFormData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
}

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    data: {
        todos: any[];
        calories: any[];
        [key: string]: any[];
    };
    navigate: NavigateFunction | null;
    setNavigate: (navigate: NavigateFunction) => void;
    login: (formData: LoginFormData) => Promise<void>;
    signup: (formData: SignupFormData) => Promise<void>;
    logout: () => void;
    fetchData: <T>(type: DataType, url: string) => Promise<T>;
    updateData: (type: DataType, newData: any[]) => void;
    postData: <T>(type: DataType, url: string, data: any) => Promise<T>;
    putData: <T>(type: DataType, url: string, id: string | number, putdata: any) => Promise<T>;
    deleteOneData: <T>(type: DataType, url: string, id: string | number) => Promise<T>;
    deleteData: (type: DataType, url: string) => Promise<void>;
}