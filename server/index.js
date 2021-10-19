const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const UserRoutes = require("./routes/UserRoutes");
const AuthRoutes = require("./routes/auth");
const PORT = process.env.PORT || 5000;
dotenv.config();
//mongo db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongo connected..."))
  .catch((err) => {
    console.log(err);
  });

//express
app.use(cors());
app.use(express.json());

//routes
app.use("/auth", AuthRoutes);
app.use("/user", UserRoutes);
app.use("/test", (req, res) =>
  res.status(200).json({ poruka: "šta bi ti ??" })
);
//server start
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}!!`);
});
