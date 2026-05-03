const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ ...req.body, role: "user", password: hashedPassword });

    return res.status(201).json({
      message: "Registration successful.",
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        bloodGroup: user.bloodGroup,
        city: user.city,
        available: user.available,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to register user.", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    return res.status(200).json({
      message: "Login successful.",
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        bloodGroup: user.bloodGroup,
        city: user.city,
        available: user.available,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to login.", error: error.message });
  }
};

const getProfile = async (req, res) => res.status(200).json(req.user);

const updateProfile = async (req, res) => {
  try {
    const disallowed = ["password", "email", "role"];
    disallowed.forEach((field) => delete req.body[field]);

    const updated = await User.findByIdAndUpdate(req.user._id, req.body, { new: true }).select("-password");
    return res.status(200).json({ message: "Profile updated.", user: updated });
  } catch (error) {
    return res.status(500).json({ message: "Profile update failed.", error: error.message });
  }
};

module.exports = { registerUser, loginUser, getProfile, updateProfile };
