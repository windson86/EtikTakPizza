const router = require("express").Router();
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51JmDLKLa14A3QCJeFVVxHdkO0TlH28888JB31hNapC74yaGTxZp7VgjgSgKEgZcdGOpagF71sxituffWzBfMXIK300k55o10vA"
);

router.post("/payment", async (req, res) => {
  console.log(req.body);
  try {
    stripe.charges.create(
      {
        amount: req.body.amount,
        currency: "eur",
        source: req.body.tokenId,
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
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

stripe.charges.create({
  amount: 2000,
  currency: "eur",
  source: "tok_amex", // obtained with Stripe.js
  metadata: { order_id: "6735" },
});
