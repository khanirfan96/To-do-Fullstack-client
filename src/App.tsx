import { Routes, Route } from "react-router";
import TodoIndex from "./pages/todo/todoindex";
import CalorieIndex from "./pages/calorietrack/calorieindex";
import Navbar from "./pages/navbar";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TodoIndex />} />
        <Route path="/calorie" element={<CalorieIndex />} />
      </Routes>
    </>
  )
}

export default App