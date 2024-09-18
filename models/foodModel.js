const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food Title is Required"],
    },
    description: {
      type: String,
      required: [true, "Description is Required"],
    },
    price: {
      type: Number,
      required: [true, "price is Required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    },
    foodtags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restaurent: {
      type: mongoose.Schema.Types.ObjectId,
      // we are creating relationship between both models
      ref: "Restaurent",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

const Food = mongoose.model("Foods", foodSchema);

module.exports = Food;
