const express = require("express");
const { searchDonors, toggleAvailability, getCities } = require("../controllers/donorController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/search", searchDonors);
router.get("/cities", getCities);
router.patch("/availability", protect, toggleAvailability);

module.exports = router;
