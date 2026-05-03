const User = require("../models/User");
const Request = require("../models/Request");

const getAdminStats = async (_req, res) => {
  try {
    const [totalUsers, totalDonors, totalRequests, completedRequests, citiesCovered] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "user" }),
      Request.countDocuments(),
      Request.countDocuments({ status: "Completed" }),
      User.distinct("city")
    ]);

    return res.status(200).json({
      totalUsers,
      totalDonors,
      totalRequests,
      completedRequests,
      citiesCovered: citiesCovered.length
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch stats.", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ message: "Admin cannot delete themselves." });
    }
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found." });
    return res.status(200).json({ message: "User deleted." });
  } catch (error) {
    return res.status(500).json({ message: "Delete failed.", error: error.message });
  }
};

const getUsers = async (_req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch users.", error: error.message });
  }
};

module.exports = { getAdminStats, deleteUser, getUsers };
