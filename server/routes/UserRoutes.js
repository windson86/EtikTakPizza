const User = require("../Models/User");
const CryptoJS = require("crypto-js");

const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const { passwordValidator } = require("../utils/passwordValidator");
const router = require("express").Router();

//Update

router.put(
  "/:id",
  passwordValidator,
  verifyTokenAndAuthorization,
  async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_KEY
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
