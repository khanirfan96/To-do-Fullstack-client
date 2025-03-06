import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from "./auth/protectroute";
import CalorieIndex from "./pages/calorietrack/calorieindex";
import Dashboard from "./pages/dashboard/dashboard";
import GymIndex from './pages/gym/gymindex';
import TodoIndex from "./pages/todo/todoindex";
import Login from "./pages/userAuth/login";
import SignUp from "./pages/userAuth/signup";
import useAuthStore from './store/todo';

const NavigationSetter = () => {
  const setNavigate = useAuthStore(state => state.setNavigate);
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate, setNavigate]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <NavigationSetter />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/todo"
          element={
            <ProtectedRoute>
              <TodoIndex />
            </ProtectedRoute>
          }
        />
        <Route path="/calorie"
          element={
            <ProtectedRoute>
              <CalorieIndex />
            </ProtectedRoute>
          }
        />
        <Route path="/week"
          element={
            <ProtectedRoute>
              <GymIndex />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App