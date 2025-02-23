import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { NavigateFunction } from 'react-router-dom';
import { create } from 'zustand';
import { CALORIE_API_URL, LOGIN_URL, SIGN_UP, TODO_API_URL } from '../utils/api_url';
import { AuthState, DataType, LoginFormData, SignupFormData, User } from './types';

const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isLoading: false,
    data: { todos: [], calories: [] },
    navigate: null,

    setNavigate: (navigate: NavigateFunction) => {
        set({ navigate });
    },

    updateData: (type: DataType, newData: any[]) => {
        set(state => ({
            data: {
                ...state.data,
                [type === 'todo' ? 'todos' : 'calories']: newData
            }
        }));
    },

    fetchData: async <T,>(type: DataType, url: string): Promise<T> => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No authentication token found");
        }

        const baseUrl = type === 'todo' ? TODO_API_URL : CALORIE_API_URL;
        try {
            const response = await axios.get<T>(`${baseUrl}${url}`, {
                headers: {
                    'token': token,
                }
            });
            
            if (Array.isArray(response.data)) {
                get().updateData(type, response.data);
            }
            
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                get().logout();
            }
            throw error;
        }
    },

    postData: async <T,>(type: DataType, url: string, data: any): Promise<T> => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No authentication token found");
        }

        const baseUrl = type === 'todo' ? TODO_API_URL : CALORIE_API_URL;
        try {
            const response = await axios.post<T>(`${baseUrl}${url}`, data, {
                headers: {
                    'token': token,
                }
            });

            // Refresh the data after successful post
            await get().fetchData(type, type === 'todo' ? 'gettodo' : 'getrecipe');
            return response.data;
        } catch (error) {
            console.error('Error posting data:', error);
            throw error;
        }
    },

    putData: async <T,>(type: DataType, url: string, id: string | number, data: any): Promise<T> => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No authentication token found");
        }

        const baseUrl = type === 'todo' ? TODO_API_URL : CALORIE_API_URL;
        try {
            const response = await axios.put<T>(`${baseUrl}${url}${id}`, data, {
                headers: {
                    'token': token,
                    'Content-Type': 'application/json'
                }
            });

            // Refresh the data after successful update
            await get().fetchData(type, type === 'todo' ? 'gettodo' : 'getrecipe');
            return response.data;
        } catch (error) {
            console.error('Error updating data:', error);
            throw error;
        }
    },

    deleteOneData:async <T,>(type: DataType, url: string, id: string | number): Promise<T> => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No authentication token found");
        }

        const baseUrl = type === 'todo' ? TODO_API_URL : CALORIE_API_URL;
        try {
            const response = await axios.delete<T>(`${baseUrl}${url}${id}`, {
                headers: {
                    'token': token,
                    'Content-Type': 'application/json'
                }
            });

            // Refresh the data after successful update
            await get().fetchData(type, type === 'todo' ? 'gettodo' : 'getrecipe');
            return response.data;
        } catch (error) {
            console.error('Error updating data:', error);
            throw error;
        }
    },

    deleteData: async (type: DataType, url: string): Promise<void> => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No authentication token found");
        }

        const baseUrl = type === 'todo' ? TODO_API_URL : CALORIE_API_URL;
        try {
            await axios.delete(`${baseUrl}${url}`, {
                headers: {
                    'token': token,
                }
            });

            get().updateData(type, []);
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    },

    login: async (formData: LoginFormData) => {
        try {
            set({ isLoading: true });
            const response = await axios.post(LOGIN_URL, formData);
            
            if (!response.data?.user?.token) {
                throw new Error("Invalid response format");
            }

            const { token } = response.data.user;
            localStorage.setItem("token", token);
            
            const decoded = jwtDecode(token) as User;
            set({ user: decoded });

            try {
                await Promise.all([
                    get().fetchData<any[]>('todo', 'gettodo'),
                    get().fetchData<any[]>('calorie', 'getrecipe')
                ]);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }

            const { navigate } = get();
            if (navigate) {
                navigate('/dashboard');
            }
        } catch (error: any) {
            console.error("Error logging in:", error);
            throw new Error(error.response?.data?.message || "Invalid credentials");
        } finally {
            set({ isLoading: false });
        }
    },

    signup: async (formData: SignupFormData) => {
        try {
            set({ isLoading: true });
            const response = await axios.post(SIGN_UP, formData);
            
            const { navigate } = get();
            if (navigate && (response.status === 200 || response.data === 200)) {
                navigate('/login');
            }
        } catch (error: any) {
            console.error("Error signing up:", error);
            throw new Error(error.response?.data?.message || "Signup failed");
        } finally {
            set({ isLoading: false });
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        set({
            user: null,
            data: { todos: [], calories: [] }
        });
        const { navigate } = get();
        if (navigate) {
            navigate('/login');
        }
    }
}));

export default useAuthStore;