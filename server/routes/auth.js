const { passwordValidator } = require("../utils/passwordValidator");
const router = require("express").Router();

const User = require("../Models/User");

const CryptoJS = require("crypto-js");

const jwt = require("jsonwebtoken");

//Register User

router.post("/register", passwordValidator, async (req, res) => {
  console.log(req.body);
  const NewUser = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_KEY
    ).toString(),
  });
  try {
    const savedUser = await NewUser.save();
    const { password, ...others } = savedUser._doc;
    res.status(201).json({ ...others });
  } catch (err) {
    console.log(err);
    res.status(501).send({ err });
  }
});

//login user

router.post("/login", passwordValidator, async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(401).json("Wrong email");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_KEY
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if (originalPassword != inputPassword) {
      return res.status(401).json({ err: "Wrong Password" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        isModerator: user.isModerator,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    //do not send password to front!!!!
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
