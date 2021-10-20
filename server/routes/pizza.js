const express = require("express");

const Pizza = require("../Models/Pizza");

const router = new express.Router();

/* router.get("/all", (req, res) => {
  Pizza.find().then((pizzas) => {
    res.status(200).json(pizzas);
  });
}); */

router.get("/all", async (req, res) => {
  try {
    const pizzas = await Pizza.find({});

    if (!pizzas) {
      return res.status(401).json("No data in database");
    }

    res.status(200).json(pizzas);
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
