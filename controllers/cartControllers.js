import { Cart } from '../models/cartModels.js';
import { CartItem } from '../models/cartItmeModels.js';


export const AddItemToCart = async (req, res) => {
    try {
        const { id } = req.user.id;
        const cart = await Cart.create({
            userId:id
        })

        const cartDetails = cart.toJSON();
        const cartId = cartDetails.id;

        const { productId,quantity,price } = req.body;
        if(!productId || !quantity || !price){
            return res
                .status(400)
                .json({
                    message:"ProductId, Quantity and price are required"
                })
        }

        const total = quantity * price
        const cartItems = await CartItem.create({
            cartId:cartId,
            productId:productId,
            quantity:quantity,
            subtotal:total
        })

        const cartItemsDetails = cartItems.toJSON();

        return res
            .status(201)
            .json({
                message:"Item added to Cart",
                cartItemsDetails
            })

    } catch (error) {
        
    }
}





















