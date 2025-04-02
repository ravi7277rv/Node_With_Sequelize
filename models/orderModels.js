import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelizeInstance.js';

export const Order = sequelize.define('Order', {
    //PrimaryKey
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Refers to the User model
            key: 'id',
        },
    },
    orderDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
        validate: {
            isFloat: { msg: 'Total price must be a number' },
        },
    },
    shippingAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shippingCity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shippingPostalCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending', // Possible values: Pending, Shipped, Delivered, Cancelled
        allowNull: false,
    },
    paymentStatus: {
        type: DataTypes.STRING,
        defaultValue: 'Unpaid', // Possible values: Unpaid, Paid, Failed
        allowNull: false,
    },
}, {
    timestamps: true,
    schema: 'test_schema',
});

