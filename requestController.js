const Request = require("../models/Request");

const createRequest = async (req, res) => {
  try {
    const created = await Request.create({ ...req.body, createdBy: req.user._id });
    return res.status(201).json({ message: "Emergency request submitted.", request: created });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create request.", error: error.message });
  }
};

const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch your requests.", error: error.message });
  }
};

const getAllRequests = async (_req, res) => {
  try {
    const requests = await Request.find().populate("createdBy", "name email").sort({ createdAt: -1 });
    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch requests.", error: error.message });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!request) return res.status(404).json({ message: "Request not found." });
    return res.status(200).json({ message: "Request status updated.", request });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update request.", error: error.message });
  }
};

module.exports = { createRequest, getMyRequests, getAllRequests, updateRequestStatus };
