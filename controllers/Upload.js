import path from "path";
import fs from "fs";
import md5 from "md5";

import { wrapAsync } from "../utils/wrapAsync.js";
import { Avatar } from "../data/models/avatar_model.js";
import { User } from "../data/models/user_model.js";


export const uploadAvatar = wrapAsync(async (req, res) => {
    const id = req.session.userId;

    if (!req.file) {
        return res.status(404).json({
            status: "failed",
            msg: "sellect some images"
        });
    }

    const ext = path.extname(req.file.originalname);
    const filename = md5(id) + ext;

    const currentAvatar = await Avatar.findOne({
        userId: id,
    });

    if (currentAvatar) {
        await Avatar.findOneAndDelete({
            userId: id,
        });
    }

    const avatar = new Avatar({
        img: {
            data: fs.readFileSync(path.join('./public/user/' + filename)),
            contentType: 'image/png'
        },
        userId: id,
    });

    const url = `${req.protocol}://${req.get('host')}/user/${filename}`;

    await User.findByIdAndUpdate(id, {
        image: url
    }, { new: true });

    await avatar.save();

    res.status(200).json({
        status: "success",
        msg: "file uploaded"
    });
});