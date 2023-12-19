import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    _id: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    response_midtrans: {
        type: String,
    },
    status: {
        type: String,
    }
}, { timestamps: true, _id: false, validateBeforeSave: true });

export const Order = mongoose.model('Order', orderSchema);