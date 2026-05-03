import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", phone: "", bloodGroup: "A+", gender: "Male", age: 18, city: "", address: "", lastDonationDate: "", available: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, age: Number(formData.age), available: formData.available === "true" || formData.available === true };
      const { data } = await api.post("/auth/register", payload);
      login(data);
      toast.success("Registered successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl glass-card">
      <h2 className="mb-5 text-2xl font-bold">Become a Donor</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <input className="rounded-xl border p-3 dark:bg-slate-800" placeholder="Full Name" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input className="rounded-xl border p-3 dark:bg-slate-800" type="email" placeholder="Email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input className="rounded-xl border p-3 dark:bg-slate-800" type="password" placeholder="Password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <input className="rounded-xl border p-3 dark:bg-slate-800" placeholder="Phone Number" required onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        <select className="rounded-xl border p-3 dark:bg-slate-800" onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}>{bloodGroups.map((group) => <option key={group}>{group}</option>)}</select>
        <select className="rounded-xl border p-3 dark:bg-slate-800" onChange={(e) => setFormData({ ...formData, gender: e.target.value })}><option>Male</option><option>Female</option><option>Other</option></select>
        <input className="rounded-xl border p-3 dark:bg-slate-800" type="number" min="18" max="65" placeholder="Age" required onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
        <input className="rounded-xl border p-3 dark:bg-slate-800" placeholder="City" required onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
        <input className="rounded-xl border p-3 dark:bg-slate-800 md:col-span-2" placeholder="Address" required onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
        <input className="rounded-xl border p-3 dark:bg-slate-800" type="date" onChange={(e) => setFormData({ ...formData, lastDonationDate: e.target.value })} />
        <select className="rounded-xl border p-3 dark:bg-slate-800" onChange={(e) => setFormData({ ...formData, available: e.target.value })}><option value="true">Available Now - Yes</option><option value="false">Available Now - No</option></select>
        <button disabled={loading} className="btn-primary md:col-span-2">{loading ? "Creating account..." : "Register"}</button>
      </form>
      <p className="mt-4 text-sm">Already have an account? <Link className="text-primary" to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
