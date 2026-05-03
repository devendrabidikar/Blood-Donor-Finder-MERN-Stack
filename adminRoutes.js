const express = require("express");
const { getAdminStats, deleteUser, getUsers } = require("../controllers/adminController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", protect, isAdmin, getAdminStats);
router.get("/users", protect, isAdmin, getUsers);
router.delete("/users/:id", protect, isAdmin, deleteUser);

module.exports = router;
