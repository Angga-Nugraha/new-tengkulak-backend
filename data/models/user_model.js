import mongoose from "mongoose";

import { Avatar } from "./avatar_model.js";
import { Cart } from "./cart_model.js";
import { Order } from "./order_model.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Phone is required"],
    },
    password: {
      type: String,
      minLength: 8,
      trim: true,
      required: [true, "Password is required"],
    },
    address: {
      detail_address: {
        type: String,
        default: null,
      },
      provinsi: {
        type: String,
        default: null,
      },
      kota: {
        type: String,
        default: null,
      },
      kecamatan: {
        type: String,
        default: null,
      },
      postal_code: {
        type: Number,
        default: null,
      },
      geo: {
        lat: {
          type: String,
          default: null,
        },
        long: {
          type: String,
          default: null,
        },
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    image: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

userSchema.post("findOneAndDelete", async function (user) {
  if (user) {
    if (!user.image) {
      await Avatar.deleteOne({ userId: user._id });
      await Cart.deleteMany({ user: user._id });
      await Order.deleteMany({ user: user._id });
    } else {
      deleteUserImage(user._id);

      await Avatar.deleteOne({ userId: user._id });
      await Cart.deleteMany({ user: user._id });
      await Order.deleteMany({ user: user._id });
    }
  }
});

export const User = mongoose.model("User", userSchema);
