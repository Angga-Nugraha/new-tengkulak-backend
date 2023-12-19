import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'product id required'],
            unique: true,
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

}, { timestamps: true, validateBeforeSave: true });

export const Cart = mongoose.model('Cart', cartSchema);