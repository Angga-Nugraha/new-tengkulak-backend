import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    qty: {
        type: Number,
    }
}, { timestamps: true });

export const Cart = mongoose.model('Cart', cartSchema);