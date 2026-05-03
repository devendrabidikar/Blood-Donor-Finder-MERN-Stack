import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EmergencyRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: "", bloodGroup: "A+", hospital: "", city: "", phone: "", urgency: "High", date: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    try {
      await api.post("/requests", formData);
      toast.success("Emergency request submitted.");
      setFormData({ patientName: "", bloodGroup: "A+", hospital: "", city: "", phone: "", urgency: "High", date: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit request.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl glass-card">
      <h2 className="mb-5 text-2xl font-bold">Emergency Blood Request</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <input className="rounded-xl border p-3 dark:bg-slate-800" placeholder="Patient Name" value={formData.patientName} required onChange={(e) => setFormData({ ...formData, patientName: e.target.value })} />
        <select className="rounded-xl border p-3 dark:bg-slate-800" value={formData.bloodGroup} onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}>{["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => <option key={bg}>{bg}</option>)}</select>
        <input className="rounded-xl border p-3 dark:bg-slate-800 md:col-span-2" placeholder="Hospital Name" value={formData.hospital} required onChange={(e) => setFormData({ ...formData, hospital: e.target.value })} />
        <input className="rounded-xl border p-3 dark:bg-slate-800" placeholder="City" value={formData.city} required onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
        <input className="rounded-xl border p-3 dark:bg-slate-800" placeholder="Contact Number" value={formData.phone} required onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        <select className="rounded-xl border p-3 dark:bg-slate-800" value={formData.urgency} onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select>
        <input className="rounded-xl border p-3 dark:bg-slate-800" type="date" value={formData.date} required onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
        <button className="btn-primary md:col-span-2">Submit Request</button>
      </form>
    </div>
  );
};

export default EmergencyRequest;
