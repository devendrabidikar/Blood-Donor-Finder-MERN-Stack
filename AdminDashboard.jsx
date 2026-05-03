import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import api from "../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);

  const loadAdminData = async () => {
    try {
      const [statsRes, requestsRes, usersRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/requests"),
        api.get("/admin/users")
      ]);
      setStats(statsRes.data);
      setRequests(requestsRes.data);
      setUsers(usersRes.data);
    } catch {
      toast.error("Admin data load failed.");
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/requests/${id}/status`, { status });
      toast.success("Request updated.");
      loadAdminData();
    } catch {
      toast.error("Update failed.");
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success("User deleted.");
      loadAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed.");
    }
  };

  if (!stats) return <p>Loading admin dashboard...</p>;

  const chartData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Donors", value: stats.totalDonors },
    { name: "Requests", value: stats.totalRequests },
    { name: "Completed", value: stats.completedRequests }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Total Users", stats.totalUsers],
          ["Total Donors", stats.totalDonors],
          ["Total Requests", stats.totalRequests],
          ["Cities Covered", stats.citiesCovered]
        ].map(([label, value]) => (
          <div key={label} className="glass-card">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="glass-card h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#dc2626" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card">
        <h3 className="mb-4 text-xl font-bold">Manage Requests</h3>
        <div className="space-y-3">
          {requests.map((req) => (
            <div key={req._id} className="rounded-xl border p-3">
              <p className="font-semibold">{req.patientName} ({req.bloodGroup}) - {req.city}</p>
              <p className="text-sm text-slate-500">Status: {req.status}</p>
              <div className="mt-2 flex gap-2">
                {["Open", "In Progress", "Completed"].map((status) => (
                  <button key={status} onClick={() => updateStatus(req._id, status)} className="rounded-lg border px-3 py-1 text-sm hover:bg-red-50 dark:hover:bg-slate-800">
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card">
        <h3 className="mb-4 text-xl font-bold">User Verification</h3>
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user._id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3">
              <div>
                <p className="font-semibold">{user.name} ({user.role})</p>
                <p className="text-sm text-slate-500">{user.email} - {user.city} - {user.bloodGroup}</p>
              </div>
              {user.role !== "admin" && (
                <button onClick={() => deleteUser(user._id)} className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white">
                  Delete Fake User
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
