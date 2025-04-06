const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  //   images: {
  //     type: [String],
  //     default: [],
  //   },
  prices: [
    {
      price: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
        // enum: ["USD", "INR", "EUR"],
      },
    },
  ],
  //   reviews: [
  //     {
  //       user: String,
  //       comment: String,
  //       rating: Number,
  //     },
  //   ],
});

const Product = mongoose.model("product", ProductSchema);
module.exports = { Product };
