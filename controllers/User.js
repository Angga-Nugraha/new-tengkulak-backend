import bcrypt from "bcrypt";

import { User } from "../data/models/user_model.js";
import { wrapAsync } from "../utils/wrapAsync.js";

export const getAllUser = wrapAsync(async (req, res) => {
  const data = await User.find({});
  res.status(200).json({
    status: "success",
    data,
  });
});

export const getUserById = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const data = await User.findById(id);
  if (!data) {
    return res.status(404).json({
      status: "failed",
      msg: "user not found",
    });
  }
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
    data,
  });
});

export const updateUser = wrapAsync(async (req, res) => {
  const { name, email, phone } = req.body;
  const { id } = req.params;

  const data = await User.findByIdAndUpdate(
    id,
    {
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      phone,
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data,
  });
});

export const updateAddressUser = wrapAsync(async (req, res) => {
  const { detail_address, provinsi, kota, kecamatan, postal_code, geo } =
    req.body;
  const { id } = req.params;

  const newAddress = {
    detail_address: detail_address.toLowerCase(),
    provinsi: provinsi.toLowerCase(),
    kota: kota.toLowerCase(),
    kecamatan: kecamatan.toLowerCase(),
    postal_code: postal_code,
    geo : geo,
  };

  const data = await User.findByIdAndUpdate(
    id,
    {
      address: newAddress,
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data,
  });
});

export const deleteUser = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({
      status: "success",
      msg: "user not found",
    });
  }

  res.status(200).json({
    status: "success",
    msg: "user deleted",
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
      msg: "incorrect password",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);

  await User.findByIdAndUpdate(
    id,
    {
      password: hashPassword,
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    msg: "password changed",
  });
});
