import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import axios from 'axios';
import { AuthState, DataType, LoginFormData, SignupFormData } from './types';
import { CALORIE_API_URL, LOGIN_URL, SIGN_UP, TODO_API_URL } from '../utils/api_url';
import { NavigateFunction } from 'react-router-dom';

// Create axios instance
const axiosInstance = axios.create();

const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set, get) => ({
                user: null,
                token: null,
                refreshToken: null,
                isLoading: false,
                data: { todos: [], calories: [] },
                navigate: null,

                initializeAuth: () => {
                    try {
                        set({ isLoading: true });
                        const token = sessionStorage.getItem('token');
                        const refreshToken = sessionStorage.getItem('refreshToken');

                        if (token) {
                            const user = JSON.parse(sessionStorage.getItem('user') || '{}');
                            set({
                                token,
                                refreshToken,
                                user
                            });

                            // Fetch initial data
                            Promise.all([
                                get().fetchData<any[]>('todo', 'gettodo'),
                                get().fetchData<any[]>('calorie', 'getrecipe')
                            ]).catch(console.error);
                        }
                    } catch (error) {
                        console.error('Auth initialization failed:', error);
                        get().logout();
                    } finally {
                        set({ isLoading: false });
                    }
                },

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
                    const baseUrl = type === 'todo' ? TODO_API_URL : CALORIE_API_URL;
                    try {
                        const response = await axiosInstance.get<T>(`${baseUrl}${url}`);

                        if (Array.isArray(response.data)) {
                            get().updateData(type, response.data);
                        }

                        return response.data;
                    } catch (error) {
                        throw error;
                    }
                },

                postData: async <T,>(type: DataType, url: string, data: any): Promise<T> => {
                    const baseUrl = type === 'todo' ? TODO_API_URL : CALORIE_API_URL;
                    try {
                        const response = await axiosInstance.post<T>(`${baseUrl}${url}`, data);
                        await get().fetchData(type, type === 'todo' ? 'gettodo' : 'getrecipe');
                        return response.data;
                    } catch (error) {
                        throw error;
                    }
                },

                putData: async <T,>(type: DataType, url: string, id: string | number, data: any): Promise<T> => {
                    const baseUrl = type === 'todo' ? TODO_API_URL : CALORIE_API_URL;
                    try {
                        const response = await axiosInstance.put<T>(`${baseUrl}${url}${id}`, data);
                        await get().fetchData(type, type === 'todo' ? 'gettodo' : 'getrecipe');
                        return response.data;
                    } catch (error) {
                        throw error;
                    }
                },

                deleteOneData: async <T,>(type: DataType, url: string, id: string | number): Promise<T> => {
                    const baseUrl = type === 'todo' ? TODO_API_URL : CALORIE_API_URL;
                    try {
                        const response = await axiosInstance.delete<T>(`${baseUrl}${url}${id}`);
                        await get().fetchData(type, type === 'todo' ? 'gettodo' : 'getrecipe');
                        return response.data;
                    } catch (error) {
                        throw error;
                    }
                },

                deleteData: async (type: DataType, url: string): Promise<void> => {
                    const baseUrl = type === 'todo' ? TODO_API_URL : CALORIE_API_URL;
                    try {
                        await axiosInstance.delete(`${baseUrl}${url}`);
                        get().updateData(type, []);
                    } catch (error) {
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

                        const { token, refresh_token, ...userData } = response.data.user;

                        // Set all auth data in Zustand state
                        set({
                            token,
                            refreshToken: refresh_token,
                            user: userData
                        });

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
                        console.error("Login error:", error);
                        throw new Error(error.response?.error || "Invalid credentials");
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
                        throw new Error(error.response?.data?.message || "Signup failed");
                    } finally {
                        set({ isLoading: false });
                    }
                },

                logout: () => {
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        data: { todos: [], calories: [] }
                    });
                    const { navigate } = get();
                    if (navigate) {
                        navigate('/login');
                    }
                }
            }),
            {
                name: 'auth-storage',
            }
        ),
        {
            name: 'AuthStore',
        }));

// Set up axios interceptors
axiosInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token && config.headers) {
            config.headers['token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);

export default useAuthStore;