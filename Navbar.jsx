import { Heart, Moon, Sun } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ darkMode, setDarkMode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `font-medium transition ${isActive ? "text-primary" : "text-slate-600 dark:text-slate-200 hover:text-primary"}`;

  return (
    <nav className="sticky top-0 z-50 border-b border-red-100 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-primary">
          <Heart className="h-6 w-6" /> Blood Donor Finder
        </Link>
        <div className="hidden items-center gap-5 md:flex">
          <NavLink className={navClass} to="/">Home</NavLink>
          <NavLink className={navClass} to="/donors">Find Donors</NavLink>
          <NavLink className={navClass} to="/request">Emergency Request</NavLink>
          {user && <NavLink className={navClass} to="/dashboard">Dashboard</NavLink>}
          {user?.role === "admin" && <NavLink className={navClass} to="/admin">Admin</NavLink>}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setDarkMode(!darkMode)} className="rounded-xl bg-red-50 p-2 dark:bg-slate-800">
            {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
          </button>
          {!user ? (
            <Link to="/login" className="btn-primary">Login</Link>
          ) : (
            <button onClick={handleLogout} className="btn-primary">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
