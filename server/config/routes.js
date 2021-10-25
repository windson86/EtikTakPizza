const authRoutes = require("../routes/auth");
const stripeRoutes = require("../routes/stripe");
const userRoutes = require("../routes/UserRoutes");
const pizzaRoutes = require("../routes/pizza");
const checkDeliveryRoute = require("../routes/chechDeliveryRoute");
const ordersRoute = require("../routes/ordersRoute");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  app.use("/checkout", stripeRoutes);
  app.use("/pizzas", pizzaRoutes);
  app.use("/delivery", checkDeliveryRoute);
  app.use("/orders", ordersRoute);
};
