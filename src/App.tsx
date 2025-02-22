import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import AuthProvider from "./auth/authcontext";
import ProtectedRoute from "./auth/protectroute";
// import Dashboard from "./pages/Dashboard";
import TodoIndex from "./pages/todo/todoindex";
import CalorieIndex from "./pages/calorietrack/calorieindex";
import Navbar from "./pages/navbar";
import Login from "./pages/user-auth/login";
import Dashboard from "./pages/dashboard/dashboard";


const App = () => {
  return (
    <Router>
    <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    </AuthProvider>
    </Router>
  )
}

export default App