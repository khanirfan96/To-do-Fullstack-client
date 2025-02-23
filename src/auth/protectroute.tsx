// import { Navigate, useLocation } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "./authcontext";

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//     const auth = useContext(AuthContext);
//     const location = useLocation();

//     if (!auth) {
//         throw new Error("ProtectedRoute must be used within an AuthProvider");
//     }

//     if (auth.isLoading) {
//         return null; // Or a loading spinner
//     }

//     if (!auth.user) {
//         return <Navigate to="/login" state={{ from: location }} replace />;
//     }

//     return <>{children}</>;
// }

// export default ProtectedRoute;

import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/todo';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const user = useAuthStore(state => state.user);
    const isLoading = useAuthStore(state => state.isLoading);

    if (isLoading) {
        return null; // or your loading component
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;