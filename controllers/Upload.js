import path from "path";
import fs from "fs";

import { wrapAsync } from "../utils/wrapAsync.js";
import { Avatar, ImageProduct } from "../data/models/avatar_model.js";
import { User } from "../data/models/user_model.js";
import { Product } from "../data/models/product_model.js";


export const uploadAvatar = wrapAsync(async (req, res) => {
    const id = req.session.userId;

    if (!req.file) {
        return res.status(404).json({
            status: "failed",
            msg: "sellect some images"
        });
    }

    const ext = path.extname(req.file.originalname);
    const filename = id + ext;

    const avatar = new Avatar({
        img: {
            data: fs.readFileSync(path.join('./public/user/' + filename)),
            contentType: `image/${ext}`
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

export const uploadproduct = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;
    const images = req.files;

    const imageProduct = [];
    const imageUrl = [];
    const product = await Product.findById(id);

    if (images.length < 1) return res.status(400).json({
        status: "failed",
        msg: "sellect some image"
    });

    for (let image of images) {
        const ext = path.extname(image.filename);
        const imgUrl = `${req.protocol}://${req.get('host')}/product/${userId}/${id}/${image.filename}`;
        const imgs = {
            data: fs.readFileSync(path.join(`./public/product/${userId}/${id}/` + image.filename,)),
            contentType: `image/${ext}`,
            url: imgUrl,
        };
        imageUrl.push(imgUrl);
        imageProduct.push(imgs);
    }

    const data = new ImageProduct({
        img: imageProduct,
        productId: id,
        userId: userId,
    });

    product.imageUrl = imageUrl;

    await data.save();
    await product.save();

    res.status(200).json({
        status: "success",
        msg: "file uploaded"
    });
});