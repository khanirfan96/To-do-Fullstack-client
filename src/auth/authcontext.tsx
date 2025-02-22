import { jwtDecode } from 'jwt-decode';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { useLogin } from '../customHook';
import axios from 'axios';
import { LOGIN_URL } from '../utils/api_url';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    user: any;
    login: any;
    logout: () => void;
    isLoading: boolean;
}

interface User {
    // Define your user type based on JWT payload
    id: string;
    email: string;
    // ... other user properties
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getToken = (token: any) => {
        try {
            const decoded = jwtDecode(token) as User;
            setUser(decoded);
            return decoded;
        } catch (error) {
            console.error("Invalid Token");
            localStorage.removeItem("token");
            return null;
        }
    }

    const login = async (formData: { email: string; password: string }) => {
        try {
            setIsLoading(true);
            const response = await axios.post(LOGIN_URL, formData);
            const { token } = response.data.user

            if (token) {
                localStorage.setItem("token", token);
                const user = getToken(token)
                if (user) {
                    navigate("/dashboard")
                }
            }
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const intializeAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const user = getToken(token)
                if (!user) {
                    navigate("/login");
                }
            }
            setIsLoading(false)
        }
        intializeAuth()

    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate('/login');
    }

    if (isLoading) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;