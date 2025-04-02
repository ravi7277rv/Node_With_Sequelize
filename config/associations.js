import { Product } from "../models/productModels.js";
import { User } from "../models/userModels.js";
import { Review } from "../models/reviewModels.js";
import { Seller } from "../models/sellerModels.js";
import { Cart } from "../models/cartModels.js";
import { CartItem } from "../models/cartItmeModels.js";
import { Order } from "../models/orderModels.js";
import { OrderItem } from "../models/orderItemsModels.js";
import { Wishlist } from "../models/wishlistModels.js";
import { WishlistItem } from "../models/wishListItemsModels.js";

// One Product can have multiple Reviews
Product.hasMany(Review, { foreignKey: 'productId', onDelete: 'CASCADE' });
Review.belongsTo(Product, { foreignKey: 'productId' });

// One User can write multiple Reviews
User.hasMany(Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'userId' });

// One Seller can have multiple Products
Seller.hasMany(Product, { foreignKey: 'sellerId', onDelete: 'CASCADE' });
Product.belongsTo(Seller, { foreignKey: 'sellerId' });

// One User has One Cart
User.hasOne(Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// One Cart has Many CartItems
Cart.hasMany(CartItem, { foreignKey: 'cartId', onDelete: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

// One Product can be in Many CartItems
Product.hasMany(CartItem, { foreignKey: 'productId', onDelete: 'CASCADE' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });


// One User has One Wishlist
User.hasOne(Wishlist, { foreignKey: 'userId', onDelete: 'CASCADE' });
Wishlist.belongsTo(User, { foreignKey: 'userId' });

// One Wishlist can have Many WishlistItems
Wishlist.hasMany(WishlistItem, { foreignKey: 'wishlistId', onDelete: 'CASCADE' });
WishlistItem.belongsTo(Wishlist, { foreignKey: 'wishlistId' });

// One Product can be in Many WishlistItems
Product.hasMany(WishlistItem, { foreignKey: 'productId', onDelete: 'CASCADE' });
WishlistItem.belongsTo(Product, { foreignKey: 'productId' });

// One User can have many Orders
User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId' });

// One Order can have many OrderItems
Order.hasMany(OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// One Product can appear in many OrderItems
Product.hasMany(OrderItem, { foreignKey: 'productId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

export { Product, Review, Seller, Cart, CartItem, Wishlist, WishlistItem, Order, OrderItem };