import { coreApi } from "../data/config/midtrans_client.js";
import { Order } from "../data/models/order_model.js";
import { wrapAsync } from "../utils/wrapAsync.js";

export const createOrder = wrapAsync(async (req, res) => {
    const user = req.session.userId;

    await coreApi.charge(req.body).then((result) => {
        const order = new Order({
            _id: result.order_id,
            user,
            amount: result.gross_amount,
            status: result.transaction_status,
            response_midtrans: JSON.stringify(result),
        });

        order.save().then(() => {
            return res.status(200).json({
                result
            });
        }).catch((err) => {
            return res.status(400).json({
                success: false, message: err.message,
            });
        });
    });
});

export const getMyOrder = wrapAsync(async (req, res) => {
    const userId = req.session.userId;
    const data = await Order.find({ user: userId });

    res.status(200).json({
        status: 'success',
        data
    });
});
