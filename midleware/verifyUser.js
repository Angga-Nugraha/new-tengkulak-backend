import { User } from "../data/models/user_model.js";

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({
            status: "failed",
            msg: "your session is expired, try to login again"
        });
    }
    const user = await User.findOne({
        _id: req.session.userId,
    });
    if (!user) return res.status(404).json({
        status: "failed",
        msg: "user not found"
    });
    req.userId = user._id;
    next();
};