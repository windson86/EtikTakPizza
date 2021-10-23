const authRoutes = require("../routes/auth");
const stripeRoutes = require("../routes/stripe");
const userRoutes = require("../routes/UserRoutes");
const pizzaRoutes = require("../routes/pizza");
const checkDeliveryRoute = require("../routes/chechDeliveryRoute");

module.exports = (app) => {
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  app.use("/checkout", stripeRoutes);
  app.use("/pizzas", pizzaRoutes);
  app.use("/delivery", checkDeliveryRoute);
};
