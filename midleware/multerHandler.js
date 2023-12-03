import multer from "multer";
import path from "path";
import md5 from "md5";
import fs from "fs";
import { Product } from "../data/models/product_model.js";
import { wrapAsync } from "../utils/wrapAsync.js";


const storageA = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/user");
    },
    filename: (req, file, cb, next) => {
        const ext = path.extname(file.originalname);
        const filename = req.session.userId + ext;
        cb(null, filename);
    }
});

const storageB = multer.diskStorage({
    destination: (req, file, cb) => {
        const { id } = req.params;
        const userId = req.session.userId;
        cb(null, `./public/product/${userId}/${id}`);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = md5(file.originalname) + ext;
        cb(null, filename);
    }
});


export const uploadAvatarImage = multer({ storage: storageA });
export const uploadProductImage = multer({ storage: storageB });