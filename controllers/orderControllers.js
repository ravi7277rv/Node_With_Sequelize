import { Order } from '../models/orderModels.js';
import { OrderItem } from '../models/orderItemsModels.js';


export const createOrder = async (req, res) => {
    try {
        
        const order = await Order.create();
        const orderItem = await OrderItem.create()
    } catch (error) {
        return res
            .status(500)
            .json({
                message:"Internal Server Error",
                error:error
            })
    }
}


























