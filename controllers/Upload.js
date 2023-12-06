import path from "path";
import fs from "fs";

import { wrapAsync } from "../utils/wrapAsync.js";
import { Avatar, ImageProduct } from "../data/models/avatar_model.js";
import { User } from "../data/models/user_model.js";
import { Product } from "../data/models/product_model.js";


export const uploadAvatar = wrapAsync(async (req, res) => {
    const id = req.session.userId;
    const image = req.file;
    const ext = path.extname(image.originalname);

    if (!image) {
        return res.status(404).json({
            status: "failed",
            msg: "select some images"
        });
    }

    const avatar = new Avatar({
        img: {
            data: fs.readFileSync(path.join(`./public/users/${id}${ext}`)),
            contentType: `image/${ext}`
        },
        userId: id,
    });

    const url = `${req.protocol}://${req.get('host')}/users/${id}${ext}`;

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

    if (images.length < 1) return res.status(400).json({
        status: "failed",
        msg: "select some image"
    });
    const imageProduct = [];
    const imageUrl = [];
    const product = await Product.findById(id);

    for (let image of images) {
        const ext = path.extname(image.originalname);


        const imgUrl = `${req.protocol}://${req.get('host')}/product/${userId}/${id}/${image.filename}`;
        const imgs = {
            data: fs.readFileSync(image.path),
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