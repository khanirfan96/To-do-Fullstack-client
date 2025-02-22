import { jwtDecode } from 'jwt-decode';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { useLogin } from '../customHook';
import axios from 'axios';
import { LOGIN_URL } from '../utils/api_url';

interface AuthContextType {
    user: any;
    login: any;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);

    const getToken = (token: any) => {
        try {
            const decoded = jwtDecode(token);
            setUser(decoded);
        } catch (error) {
            console.error("Invalid Token");
            localStorage.removeItem("token");
        }
    }

    const login = async (formData:any) => {
        try {
          const response = await axios.post(LOGIN_URL, {
             email:formData.email,
             password:formData.password,
          });    
          const data = await response.data;
          console.log(data.user.token, 'data')
          if (data) {
            localStorage.setItem("token", data.user.token);
            getToken(data.user.token);
            window.location.href = "/dashboard";
          }
        } catch (error) {
          console.error("Error logging in:", error);
        }
      };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getToken(token)
        } else {
            console.log("Invalid Token: ");
            localStorage.removeItem("token")
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        window.location.href = '/login';
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;