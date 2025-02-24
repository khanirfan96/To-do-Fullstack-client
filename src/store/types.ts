import { NavigateFunction } from 'react-router-dom';
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

export interface User {
    ID: string;
    email: string;
    first_name: string;
    last_name: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    data: {
        todos: any[];
        calories: any[];
    };
    navigate: NavigateFunction | null;
    setNavigate: (navigate: NavigateFunction) => void;
    updateData: (type: DataType, newData: any[]) => void;
    fetchData: <T>(type: DataType, url: string) => Promise<T>;
    postData: <T>(type: DataType, url: string, data: any) => Promise<T>;
    putData: <T>(type: DataType, url: string, id: string | number, data: any) => Promise<T>;
    deleteOneData: <T>(type: DataType, url: string, id: string | number) => Promise<T>;
    deleteData: (type: DataType, url: string) => Promise<void>;
    login: (formData: LoginFormData) => Promise<void>;
    signup: (formData: SignupFormData) => Promise<void>;
    logout: () => void;
    initializeAuth: () => void;
}

export type DataType = 'todo' | 'calorie';