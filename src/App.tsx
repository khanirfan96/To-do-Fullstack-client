import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./auth/authcontext";
import ProtectedRoute from "./auth/protectroute";
// import Dashboard from "./pages/Dashboard";
import TodoIndex from "./pages/todo/todoindex";
import CalorieIndex from "./pages/calorietrack/calorieindex";
import Navbar from "./pages/navbar";
import Login from "./pages/sign/login";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard"
            element={
              <ProtectedRoute>
                <TodoIndex />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App