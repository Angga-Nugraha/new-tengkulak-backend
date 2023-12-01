import { User } from "../data/models/user_model.js";

export const verifyAdmin = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({
            status: "failed",
            msg: "your session is expired, try to login again"
        });
    }

    const user = await User.findOne({
        _id: req.session.userId,
    });

    if (user.role !== 'admin') return res.status(404).json({
        status: "failed",
        msg: "access denided"
    });
    req.userId = user._id;
    next();
};