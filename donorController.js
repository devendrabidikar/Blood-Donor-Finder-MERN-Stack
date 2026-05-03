const User = require("../models/User");

const searchDonors = async (req, res) => {
  try {
    const { bloodGroup, city, available } = req.query;
    const filter = { role: "user" };

    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (city) filter.city = { $regex: city, $options: "i" };
    if (available === "true") filter.available = true;
    if (available === "false") filter.available = false;

    const donors = await User.find(filter).select("name bloodGroup city phone available").sort({ updatedAt: -1 });
    return res.status(200).json(donors);
  } catch (error) {
    return res.status(500).json({ message: "Failed to search donors.", error: error.message });
  }
};

const toggleAvailability = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.available = !user.available;
    await user.save();
    return res.status(200).json({ message: "Availability updated.", available: user.available });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update availability.", error: error.message });
  }
};

const getCities = async (_req, res) => {
  try {
    const cities = await User.distinct("city");
    return res.status(200).json(cities.sort());
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch cities.", error: error.message });
  }
};

module.exports = { searchDonors, toggleAvailability, getCities };
