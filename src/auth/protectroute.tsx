import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/authcontext";

const ProtectedRoute = ({ children }: { children: any }) => {
    const { user }: any = useContext(AuthContext);

    return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute