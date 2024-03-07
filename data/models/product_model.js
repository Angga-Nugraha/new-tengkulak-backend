import mongoose from "mongoose";
import { ImageProduct } from "./avatar_model.js";
import { deleteProductId } from "../../utils/utils.js";


const productSchema = new mongoose.Schema({
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
    },
    imageUrl: {
        type: [String],
        default: [],
    },
}, { timestamps: true, validateBeforeSave: true });

productSchema.post("findOneAndDelete", async function (product) {
    if (product) {
        await ImageProduct.findOneAndDelete({ productId: product._id });
        deleteProductId(product._id);
    }
});


export const Product = mongoose.model('Product', productSchema);