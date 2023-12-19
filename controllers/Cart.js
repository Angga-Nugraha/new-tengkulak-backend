import { Cart } from '../data/models/cart_model.js';
import { wrapAsync } from '../utils/wrapAsync.js';


export const addToCart = wrapAsync(async (req, res) => {
    const userId = req.session.userId;
    const { product } = req.body;

    const data = await Cart.findOne({ user: userId });
    if (!data) {
        const cart = new Cart({
            products: product,
            user: userId
        });

        await cart.save();
    } else {
        if (data.products.indexOf(product) === -1) {
            data.products.push(product);
        }
        await data.save();
    }
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
    const data = await Cart.findOne({ user: userId })
        .populate({
            path: 'products',
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

    const data = await Cart.findOne({ user: userId });
    const index = data.products.indexOf(id);
    data.products.splice(index, 1);
    await data.save();

    res.status(200).json({
        status: 'success',
        msg: 'remove from cart'
    });
});