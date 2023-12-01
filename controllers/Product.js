import { Product } from "../data/models/product_model.js";
import { wrapAsync } from "../utils/wrapAsync.js";

export const createProduct = wrapAsync(async (req, res) => {
    const {
        title, description, price,
        ratting, stock, weight, category } = req.body;
    const userId = req.session.userId;

    const product = new Product({
        userId,
        title,
        description,
        price,
        ratting,
        stock,
        weight,
        category,
    });

    await product.save();

    res.status(200).json({
        status: "success",
        product
    });
});