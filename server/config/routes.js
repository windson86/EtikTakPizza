const authRoutes = require("../routes/auth");
const stripeRoutes = require("../routes/stripe");
const userRoutes = require("../routes/UserRoutes");
const pizzaRoutes = require("../routes/pizza");
const checkDeliveryRoute = require("../routes/chechDeliveryRoute");
const ordersRoute = require("../routes/ordersRoute");

module.exports = (app) => {
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  app.use("/checkout", stripeRoutes);
  app.use("/pizzas", pizzaRoutes);
  app.use("/delivery", checkDeliveryRoute);
  app.use("/orders", ordersRoute);
};
