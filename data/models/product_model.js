import mongoose from "mongoose";


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


export const Product = mongoose.model('Product', productSchema);