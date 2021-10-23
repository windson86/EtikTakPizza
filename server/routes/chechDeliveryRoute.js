const router = require("express").Router();
const nodemailer = require("nodemailer");

//const checkDeliveryController = require("../controllers/check.delivery");

router.post("/check", async (req, res) => {
  try {
    const cart = req.body.cart;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tiktakpizzaonline@gmail.com",
        pass: "tikT@K22",
      },
    });

    const test = cart.products[0].name.toString();

    const info = await transporter.sendMail({
      from: '"Tik Tak Narudzba"',
      to: "petrovic1986@gmail.com ",
      subject: "new Order ✔",
      text: "new order id:",
      html: `<form action="http://localhost:5000/delivery/confirm/2233">
      <input type="submit" value="Potvrdi" />
  </form> <span>${test}<span>`,
    });

    console.log("Message sent: %s", info.messageId);

    /* if (Confirmed) {
      res.status(200).json({ message: "order confirmed" });
    } */
  } catch (err) {
    console.log(err);
  }
});

router.get("/confirm/:id", (req, res) => {
  console.log("ID:", req.params.id);
  res.send("Poslano korisniku");
});

module.exports = router;
