import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
function LogoutButton() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <button className="flex items-center gap-3 px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all mt-auto" onClick={handleLogout}>
        <LogOut size={20} />
        Logout
      </button>
  );
}

export default LogoutButton;