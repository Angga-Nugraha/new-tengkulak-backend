import multer from "multer";
import path from "path";
import md5 from "md5";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'user') {
            cb(null, "./public/users");
        }
        if (file.fieldname === 'product') {
            const { id } = req.params;
            const userId = req.session.userId;
            cb(null, `./public/product/${userId}/${id}`);
        }
    },
    filename: (req, file, cb) => {
        if (file.fieldname === 'user') {
            const ext = path.extname(file.originalname);
            const filename = req.session.userId + ext;
            cb(null, filename);
        }
        if (file.fieldname === 'product') {
            const ext = path.extname(file.originalname);
            const filename = file.fieldname + Date.now() + ext;
            cb(null, filename);
        }
    }
});

const filter = (req, file, callback) => {
    var ext = path.extname(file.originalname);
    if (file.fieldname === 'user' && ext !== '.jpg') {
        return callback(new Error('Only jpg images are allowed'));
    }
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
        return callback(new Error('Only images are allowed'));
    }
    callback(null, true);
};


export const uploadImage = multer({
    storage: storage,
    fileFilter: filter,
});
