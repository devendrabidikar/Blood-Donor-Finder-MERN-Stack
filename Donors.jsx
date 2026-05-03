import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import DonorCard from "../components/DonorCard";

const Donors = () => {
  const [filters, setFilters] = useState({ bloodGroup: "", city: "", available: "" });
  const [donors, setDonors] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/donors/search", { params: filters });
      setDonors(data);
    } catch {
      toast.error("Unable to load donors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
    api.get("/donors/cities").then((res) => setCities(res.data)).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="glass-card grid gap-3 md:grid-cols-4">
        <select className="rounded-xl border p-3 dark:bg-slate-800" onChange={(e) => setFilters({ ...filters, bloodGroup: e.target.value })}>
          <option value="">All Blood Groups</option>
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => <option key={bg}>{bg}</option>)}
        </select>
        <input list="city-list" className="rounded-xl border p-3 dark:bg-slate-800" placeholder="City" onChange={(e) => setFilters({ ...filters, city: e.target.value })} />
        <datalist id="city-list">{cities.map((city) => <option key={city} value={city} />)}</datalist>
        <select className="rounded-xl border p-3 dark:bg-slate-800" onChange={(e) => setFilters({ ...filters, available: e.target.value })}>
          <option value="">Any Availability</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
        <button className="btn-primary" onClick={fetchDonors}>Search Donors</button>
      </div>

      <iframe
        className="h-64 w-full rounded-2xl border"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=72.7%2C18.8%2C73.1%2C19.2&layer=mapnik&marker=19.0760%2C72.8777`}
        title="Nearby donor map"
      />

      {loading ? <p className="text-center">Searching donors...</p> : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {donors.map((donor) => <DonorCard key={donor._id} donor={donor} />)}
        </div>
      )}
      {!loading && donors.length === 0 && <p className="text-center text-slate-500">No donors found for current filters.</p>}
    </div>
  );
};

export default Donors;
