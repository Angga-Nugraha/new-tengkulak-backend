import bcrypt from "bcrypt";


import { User } from "../data/models/user_model.js";
import { wrapAsync } from "../utils/wrapAsync.js";


export const getAllUser = wrapAsync(async (req, res) => {
  const data = await User.find({});
  res.status(200).json({
    status: "success",
    data
  });
});

export const getUserById = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const data = await User.findById(id);

  res.status(200).json({
    status: "success",
    data,
  });
});

export const searchUser = wrapAsync(async (req, res) => {
  const { query } = req.query;
  // $regex berfungsi untuk mencari kata kunci yang serupa pada field data pada mongoose
  const data = await User.find({ name: { $regex: query } });
  res.status(200).json({
    status: "success",
    data
  });
});

export const updateUser = wrapAsync(async (req, res) => {
  const { name, email, phone, address } = req.body;
  const { id } = req.params;

  const data = await User.findByIdAndUpdate(id, { name, email, phone, address }, { new: true });
  res.status(200).json({
    status: "success",
    data,
  });
});


export const deleteUser = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findOneAndDelete({ id });

  if (!user) {
    return res.status(404).json({
      status: "success",
      msg: "user not found",
    });
  }

  res.status(200).json({
    status: "success",
    msg: "user deleted"
  });
});

export const changePassword = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(id);
  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch || newPassword.length < 8) {
    return res.status(402).json({
      status: "failed",
      msg: "incorrect password"
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);

  await User.findByIdAndUpdate(id, {
    password: hashPassword
  }, { new: true });

  res.status(200).json({
    status: "success",
    msg: "password changed"
  });
});
