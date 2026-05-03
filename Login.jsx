import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", formData);
      login(data);
      toast.success("Welcome back!");
      navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md glass-card">
      <h2 className="mb-5 text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full rounded-xl border p-3 dark:bg-slate-800" placeholder="Email" type="email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input className="w-full rounded-xl border p-3 dark:bg-slate-800" placeholder="Password" type="password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button disabled={loading} className="btn-primary w-full">{loading ? "Please wait..." : "Login"}</button>
      </form>
      <p className="mt-4 text-sm">No account? <Link className="text-primary" to="/register">Register now</Link></p>
    </div>
  );
};

export default Login;
