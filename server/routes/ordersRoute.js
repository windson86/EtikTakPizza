const express = require("express");

const Order = require("../Models/Order");

const router = new express.Router();
const { verifyToken } = require("./verifyToken");

router.post("/create", verifyToken, async (req, res) => {
  try {
    console.log(req.body + req.headers);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
