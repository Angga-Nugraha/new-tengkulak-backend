import path from 'path';
import fs from "fs";
import { fileURLToPath } from 'url';
import { wrapAsync } from './wrapAsync.js';
import { Product } from '../data/models/product_model.js';


export const getDirName = function (moduleUrl) {
    const filename = fileURLToPath(moduleUrl);
    return path.dirname(filename);
};

export const createFolder = wrapAsync(async (req, res, next) => {

    const { id } = req.params;
    const userId = req.session.userId;

    const product = await Product.findById({ _id: id });

    if (product) {
        const filepath = path.join('./public/product', `${userId + '/' + id}`);

        fs.mkdirSync(filepath, { recursive: true }, (err) => {
            if (err) {
                return next(err);
            }
            console.log('Directory created successfully!');
        });

    }
    next();
});

export const deleteUserImage = (userId) => {
    const filepath = `./public/user/`;
    fs.readdir(filepath, (err, files) => {
        files = files.filter(file => file.includes(userId));

        files.map(name => fs.unlinkSync(filepath + name));
    });
};

export const deleteProductUser = (userId) => {
    const filepath = `./public/product/${userId}`;
    fs.rmSync(filepath, { recursive: true, force: true });
};

export const deleteProductId = (userId, productId) => {
    const filepath = `./public/product/${userId}/${productId}`;
    fs.rmSync(filepath, { recursive: true, force: true });
};