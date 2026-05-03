const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true, trim: true },
    bloodGroup: { type: String, required: true, trim: true },
    hospital: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    urgency: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium" },
    date: { type: Date, required: true },
    status: { type: String, enum: ["Open", "In Progress", "Completed"], default: "Open" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
