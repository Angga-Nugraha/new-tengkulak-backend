import { Product } from "../data/models/product_model.js";
import { wrapAsync } from "../utils/wrapAsync.js";

export const createProduct = wrapAsync(async (req, res) => {
    const {
        title, description, price,
        ratting, stock, weight, category } = req.body;
    const userId = req.session.userId;

    const product = new Product({
        userId,
        title: title.toLowerCase(),
        description: description.toLowerCase(),
        price,
        ratting,
        stock,
        weight,
        category,
    });

    await product.save();

    res.status(200).json({
        status: "success",
        data: product
    });
});

export const getAllProduct = wrapAsync(async (req, res) => {
    const product = await Product.find({});

    res.status(200).json({
        status: "success",
        data: product
    });
});

export const getProductByCategory = wrapAsync(async (req, res) => {
    const { category } = req.params;
    const product = await Product.find({
        category: { $in: category }
    });

    res.status(200).json({
        status: "success",
        data: product
    });
});

export const getProductById = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({
            status: "failed",
            msg: "product not found"
        });
    }
    res.status(200).json({
        status: "success",
        data: product
    });
});


export const searchProduct = wrapAsync(async (req, res) => {
    const { query } = req.query;

    const product = await Product.find({
        $or: [{ title: { $regex: query } }, { category: { $regex: query } }]
    });

    res.status(200).json({
        status: "success",
        data: product
    });
});

export const deleteProduct = wrapAsync(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findOneAndDelete({ _id: id });

    if (!product) {
        return res.status(404).json({
            status: "failed",
            msg: "product not found"
        });
    }
    res.status(200).json({
        status: "success",
        msg: "product deleted"
    });
});