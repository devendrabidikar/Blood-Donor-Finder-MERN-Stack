import { MessageCircle } from "lucide-react";

const DonorCard = ({ donor }) => {
  const waUrl = `https://wa.me/${donor.phone.replace(/[^\d]/g, "")}?text=Hi%2C%20I%20need%20${donor.bloodGroup}%20blood%20in%20${donor.city}.`;

  return (
    <div className="glass-card transition hover:-translate-y-1">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white">{donor.name}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Blood Group: {donor.bloodGroup}</p>
      <p className="text-sm text-slate-600 dark:text-slate-300">City: {donor.city}</p>
      <p className="text-sm text-slate-600 dark:text-slate-300">Phone: {donor.phone}</p>
      <p className={`mt-2 text-sm font-semibold ${donor.available ? "text-emerald-600" : "text-amber-600"}`}>
        {donor.available ? "Available now" : "Currently unavailable"}
      </p>
      <a href={waUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white">
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </a>
    </div>
  );
};

export default DonorCard;
