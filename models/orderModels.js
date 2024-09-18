const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    food: [475
      
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Foods", // yaha pr model name aata hai aapka food models ki nam se data base me hai vo
      },
    ],
    payment: {
        // we are not using any gateway so we left it here as it is
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Preparing", "Prepared", "On the Way", "Delivered"],
      default: "Preparing",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Orders", orderSchema);

module.exports = Order;

