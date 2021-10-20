const mongoose = require("mongoose");

const REQUIRED_VALIDATION_MESSAGE = "{PATH} is required";

let PizzaSchema = new mongoose.Schema(
  {
    name: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
    desc: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    img: { type: String },
    size: { type: String },
    price: { type: Number, required: REQUIRED_VALIDATION_MESSAGE },
    ingredients: { type: Array },
    likes: [],
    reviews: [],
  },
  { timestamps: true }
);
let Pizza = mongoose.model("Pizza", PizzaSchema);

module.exports = Pizza;

const pizzasSeed = [
  {
    name: "Caprichosa/Miješana",
    ingredients: ["origano", "šunka", "sir", "paradajz sos", "gljive"],
    desc: "Najprodavanija Pizza u okolici",
    price: 5.4,
    size: ["mala", "normalna", "jumbo"],
    img: "https://vignette.wikia.nocookie.net/oddsquad/images/f/f4/Pizza.png/revision/latest?cb=20170203223737",
    likes: [],
    reviews: [],
  },
  {
    name: "Margarita",
    ingredients: ["origano", "sir", "paradajz sos"],
    desc: "originalna Talijanska receptura pizze",
    price: 5.01,
    size: ["mala", "normalna", "jumbo"],
    img: "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX3469401.jpg",
    likes: [],
    reviews: [],
  },
  {
    name: "Picante",
    ingredients: [
      "origano",
      "šunka",
      "gljive",
      "ljuti feferoni",
      "sir",
      "paradajz umak",
      "panceta",
    ],
    desc: "najdraža pizza kreatora stranice i odlična uz dobru pivu",
    price: 5.89,
    size: ["mala", "normalna", "jumbo"],
    img: "https://images.pizza33.ua/products/product/yQfkJqZweoLn9omo68oz5BnaGzaIE0UJ.jpg",
    likes: [],
    reviews: [],
  },
  {
    name: "Test Pizza za naplatu",
    ingredients: [
      "origano",
      "šunka",
      "gljive",
      "ljuti feferoni",
      "sir",
      "paradajz umak",
      "panceta",
    ],
    desc: "najdraža pizza kreatora stranice i odlična uz dobru pivu",
    price: 0.02,
    size: ["mala", "normalna", "jumbo"],
    img: "https://images.pizza33.ua/products/product/yQfkJqZweoLn9omo68oz5BnaGzaIE0UJ.jpg",
    likes: [],
    reviews: [],
  },
];

module.exports.seedPizzas = () => {
  Pizza.find({}).then((pizzas) => {
    if (pizzas.length > 0) return;
    Pizza.create(pizzasSeed)
      .then(() => console.log("Seeded pizzas successfully."))
      .catch((error) => console.log(error));
  });
};
