import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeInstance.js';

export const OrderItem = sequelize.define('OrderItem', {
    //PrimaryKey
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Orders',
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
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    priceAtPurchase: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    timestamps: true,
    schema: 'test_schema',
}
);

