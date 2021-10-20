const router = require("express").Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
  console.log(req.body);
  try {
    stripe.charges.create(
      {
        amount: req.body.amount * 100,
        currency: "eur",
        source: req.body.tokenId,
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          console.log(stripeErr);
          res.status(500).json(stripeErr);
        } else {
          res.status(200).json(stripeRes);
        }
      }
    );
  } catch (err) {
    res.status(505).json({ err });
  }
});

module.exports = router;
