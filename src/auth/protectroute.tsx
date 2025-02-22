import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authcontext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const auth = useContext(AuthContext);
    const location = useLocation();

    if (!auth) {
        throw new Error("ProtectedRoute must be used within an AuthProvider");
    }

    if (auth.isLoading) {
        return null; // Or a loading spinner
    }

    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;