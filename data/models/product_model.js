import mongoose from "mongoose";
import fs from "fs";
import { ImageProduct } from "./avatar_model.js";
import { deleteProductId } from "../../utils/utils.js";
import { Cart } from "./cart_model.js";


const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    ratting: {
        type: Number,
    },
    stock: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    category: {
        type: [String],
        required: [true, 'Category is required']
    },
    imageUrl: {
        type: [String],
    },
}, { timestamps: true, validateBeforeSave: true });

productSchema.post("findOneAndDelete", async function (product) {
    if (product) {
        await ImageProduct.findOneAndDelete({ productId: product._id });
        await Cart.findOneAndDelete({ productId: product._id });
        deleteProductId(product.userId, product._id);
    }
});


export const Product = mongoose.model('Product', productSchema);