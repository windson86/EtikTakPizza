const express = require("express");

const Order = require("../Models/Order");

const router = new express.Router();
const { verifyTokenAndAuthorization } = require("./verifyToken");

router.post("/create/:id", verifyTokenAndAuthorization, async (req, res) => {
  const newOrder = new Order({
    userId: req.user.id,
    products: req.body.products,
    amount: req.body.amount,
    date: req.body.date,
    address: req.body.address,
  });
  try {
    console.log(req.body);
    const CreatedOrder = await newOrder.save();
    res.status(201).json(CreatedOrder);
  } catch (error) {
    console.log(error);
    res.status(501).send({ error });
  }
});

router.get("/myorders/:id", verifyTokenAndAuthorization, async (req, res) => {
  const id = req.user.id;
  try {
    Order.find({ userId: req.user.id }).then((orders) => {
      res.status(200).json(orders);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
