export const verifyInput = async (req, res, next) => {
    if (req.body.password !== req.body.confPassword) {
        return res
            .status(400)
            .json({
                status: "failed",
                msg: "password and confirm password doesn't match",
            });
    }
    if (req.body.password.length < 8) {
        return res
            .status(400)
            .json({
                status: "failed",
                msg: "password less then 8 character",
            });
    }
    next();
};