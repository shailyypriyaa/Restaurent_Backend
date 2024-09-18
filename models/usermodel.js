const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      requirerd: [true, "user name is required"],
    },
    email: {
      type: String,
      requirerd: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "PhoneNo is required"],
    },
    usertype: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
    },
    answer:{
        type:String,
        required:[true,'Answer is Required']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
