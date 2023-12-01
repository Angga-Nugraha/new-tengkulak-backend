import mongoose from "mongoose";
import { Avatar } from "./avatar_model.js";
import fs from "fs";

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
    await Avatar.deleteOne({ userId: user._id });
    const filepath = `./public/user/${user.image.split('/')[4]}`;
    fs.unlinkSync(filepath);
  }
});

export const User = mongoose.model("User", userSchema);
