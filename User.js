const mongoose = require("mongoose");

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    bloodGroup: { type: String, enum: bloodGroups, required: true },
    city: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    age: { type: Number, min: 18, max: 65, required: true },
    address: { type: String, required: true, trim: true },
    lastDonationDate: { type: Date },
    available: { type: Boolean, default: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
