import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }],
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['process', 'success']
    }
});

export const Order = mongoose.model('Order', orderSchema);