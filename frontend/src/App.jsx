import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminRoute from './components/admin/AdminRoute'
import UserRoute from "./components/user/UserRoute";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import MainPage from "./pages/MainPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<UserRoute><Home /></UserRoute>} />
        <Route path="/cart" element={<UserRoute> <Cart/> </UserRoute>}/>
        <Route path="/orders" element={<UserRoute> <Orders /></UserRoute>} />
        <Route path="/admin" element={<AdminRoute> <AdminDashboard /> </AdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;