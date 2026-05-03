const express = require("express");
const {
  createRequest,
  getMyRequests,
  getAllRequests,
  updateRequestStatus
} = require("../controllers/requestController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createRequest);
router.get("/my", protect, getMyRequests);
router.get("/", protect, isAdmin, getAllRequests);
router.patch("/:id/status", protect, isAdmin, updateRequestStatus);

module.exports = router;
