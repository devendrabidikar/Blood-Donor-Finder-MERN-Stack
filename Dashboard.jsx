import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, fetchMe } = useAuth();
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({ name: "", city: "", phone: "", address: "", lastDonationDate: "" });

  const loadData = async () => {
    try {
      const [profile, myRequests] = await Promise.all([api.get("/auth/me"), api.get("/requests/my")]);
      setFormData({
        name: profile.data.name || "",
        city: profile.data.city || "",
        phone: profile.data.phone || "",
        address: profile.data.address || "",
        lastDonationDate: profile.data.lastDonationDate?.slice(0, 10) || ""
      });
      setRequests(myRequests.data);
    } catch {
      toast.error("Failed to load dashboard.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await api.put("/auth/me", formData);
      await fetchMe();
      toast.success("Profile updated.");
    } catch {
      toast.error("Could not update profile.");
    }
  };

  const toggleAvailability = async () => {
    try {
      await api.patch("/donors/availability");
      await fetchMe();
      toast.success("Availability toggled.");
    } catch {
      toast.error("Could not toggle availability.");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="glass-card">
        <h2 className="text-xl font-bold">My Profile</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Donation history starts from your last donation date.</p>
        <button onClick={toggleAvailability} className="mt-3 rounded-xl bg-slate-900 px-4 py-2 text-white dark:bg-slate-700">
          {user?.available ? "Set Unavailable" : "Set Available"}
        </button>
        <form className="mt-4 space-y-3" onSubmit={updateProfile}>
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              type={key.includes("Date") ? "date" : "text"}
              value={formData[key]}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
              className="w-full rounded-xl border p-3 dark:bg-slate-800"
              placeholder={key}
            />
          ))}
          <button className="btn-primary">Save Changes</button>
        </form>
      </section>

      <section className="glass-card">
        <h2 className="text-xl font-bold">My Requests</h2>
        <div className="mt-4 space-y-3">
          {requests.map((req) => (
            <div key={req._id} className="rounded-xl border p-3">
              <p className="font-semibold">{req.patientName} - {req.bloodGroup}</p>
              <p className="text-sm text-slate-500">{req.hospital}, {req.city}</p>
              <p className="text-sm">Status: <span className="font-semibold text-primary">{req.status}</span></p>
            </div>
          ))}
          {requests.length === 0 && <p className="text-sm text-slate-500">No requests yet.</p>}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
