const validator = require("validator");
const passwordValidator = (req, res, next) => {
  if (req.body.password) {
    const password = req.body.password;
    if (password.length < 6 || password === "") {
      return res.status(505).json({ message: "password too short" });
    }
  }
  if (req.body.email) {
    const email = req.body.email;
    if (!validator.isEmail(email)) {
      return res.status(504).send({ err: "check your email for typo" });
    }
  }
  next();
};
module.exports = {
  passwordValidator,
};
