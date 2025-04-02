import { sequelize } from "./sequelizeInstance.js";
import { CartItem, WishlistItem, Seller, Product, Review ,  Cart,  Wishlist, Order, OrderItem  } from "./associations.js";

export const DBConnection = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.')
        await sequelize.sync({ alter: true });
        console.log('The User table has been created.');
    } catch (error) {
        console.log('Unable to connect to the database :',error)
    }
}

