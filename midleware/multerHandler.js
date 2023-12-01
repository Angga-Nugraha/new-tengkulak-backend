import multer from "multer";
import path from "path";
import md5 from "md5";


const limits = {
    fields: 10,
    filesize: 150 * 150,
    files: 1,
};
const storageA = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/user");
    },
    filename: (req, file, cb, next) => {
        const ext = path.extname(file.originalname);
        const filename = md5(req.session.userId) + ext;
        cb(null, filename);
    }
});

const storageB = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/product");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = md5(req.session.userId) + ext;
        cb(null, filename);
    }
});

export const uploadAvatarImage = multer({ storage: storageA, limits: limits });
export const uploadProductImage = multer({ storage: storageB, limits: limits });