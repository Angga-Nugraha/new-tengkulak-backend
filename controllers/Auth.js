import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../data/models/user_model.js";
import { wrapAsync } from "../utils/wrapAsync.js";


export const register = wrapAsync(async (req, res) => {

  const { name, email, phone, password, role, address } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: hashPassword,
    role: role,
    phone: phone,
    address: address.toLowerCase(),
    token: null,
  });

  await user.save();

  res.status(200).json({
    status: "success",
    msg: "register success",
  });

});

export const login = wrapAsync(async (req, res) => {

  const user = await User.findOne({
    // find user berdasarkan email/phone
    $or: [{ email: req.body.email.toLowerCase() }, { phone: req.body.email.toLowerCase() }],
  });

  if (!user) {
    return res.status(404).json({
      status: "failed",
      msg: "user not found",
    });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      status: "failed",
      msg: "incorrect password",
    });
  }

  req.session.userId = user._id;
  const id = user._id;
  const name = user.name;
  const email = user.email;
  const accessToken = jwt.sign({ id, name, email }, process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  await User.findByIdAndUpdate(
    id,
    { token: accessToken },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    id,
    accessToken,
  });



});

export const logout = (req, res) => {
  req.session.destroy(async (err) => {
    if (err) return res.status(400).json({ msg: "Can't logout" });

    const token = req.cookies.accessToken;
    if (!token) return res.sendStatus(204);

    const user = await User.findOne({
      token: token
    });

    if (!user) return res.sendStatus(204);

    const id = user._id;
    await User.findByIdAndUpdate(id, { token: null });
    res.clearCookie("accessToken");

    return res.status(200).json({
      status: "success",
      msg: "Logout success",
    });
  });
};
