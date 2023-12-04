import { Cart } from '../data/models/cart_model.js';
import { wrapAsync } from '../utils/wrapAsync.js';


export const addToCart = wrapAsync(async (req, res) => {
    const userId = req.session.userId;
    const { productId, qty } = req.body;

    const data = new Cart({
        productId,
        userId,
        qty
    });

    await data.save();
    res.status(200).json({
        status: 'success',
        msg: 'add to cart'
    });
});

export const getAllCart = wrapAsync(async (req, res) => {
    const data = await Cart.find({});
    res.status(200).json({
        status: "success",
        data,
    });
});

export const getMyCart = wrapAsync(async (req, res) => {
    const userId = req.session.userId;
    const data = await Cart.find({ userId })
        .populate({
            path: 'productId',
            select: 'title price ratting weight category imageUrl'
        });

    res.status(200).json({
        status: 'success',
        data
    });
});

export const removeProductFromCart = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;

    const data = await Cart.findOneAndDelete({ $and: [{ userId }, { _id: id }] });
    if (!data) return res.status(200).json({
        status: "failed",
        msg: 'product not found'
    });
    res.status(200).json({
        status: 'success',
        msg: 'remove from cart'
    });
});