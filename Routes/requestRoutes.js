const express = require("express");
const router = express.Router();
const {
  getRequest,
  getRequests,
  createRequest,
  acceptRequest,
} = require("../controllers/requestController");

router.get("/requests/:id", getRequests);

router.get("/request", (req, res) => res.send("<div>OK</div>"));

router.post("/request", createRequest);

router.post("/accept", acceptRequest);

router.get("/accept", (req, res) => res.send("<div>OK</div>"));

module.exports = router;
