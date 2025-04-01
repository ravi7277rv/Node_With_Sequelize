import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelizeInstance.js";

export const WishlistItem = sequelize.define('WishlistItem', {
    //Primary Key
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    wishlistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Wishlists',
            key: 'id',
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id',
        },
    },
    addedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: true,
    schema: 'test_schema',
  });

