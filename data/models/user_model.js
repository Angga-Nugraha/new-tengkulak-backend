import mongoose from "mongoose";
import fs from "fs";

import { Avatar, ImageProduct } from "./avatar_model.js";
import { Product } from "./product_model.js";
import { deleteProductUser, deleteUserImage } from "../../utils/utils.js";
import { Cart } from "./cart_model.js";

const userSchema = new mongoose.Schema({
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
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  image: {
    type: String,
  },
  token: {
    type: String,
  },
}, { timestamps: true, validateBeforeSave: true });

userSchema.post("findOneAndDelete", async function (user) {
  if (user) {
    if (!user.image) {
      deleteProductUser(user._id);

      await Avatar.deleteOne({ userId: user._id });
      await Product.deleteMany({ userId: user._id });
      await ImageProduct.deleteMany({ userId: user._id });
      await Cart.deleteMany({ userId: user._id });

    } else {
      deleteUserImage(user._id);
      deleteProductUser(user._id);

      await Avatar.deleteOne({ userId: user._id });
      await Product.deleteMany({ userId: user._id });
      await ImageProduct.deleteMany({ userId: user._id });
      await Cart.deleteMany({ userId: user._id });
    }
  }
});

export const User = mongoose.model("User", userSchema);
