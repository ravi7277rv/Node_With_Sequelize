import { DataTypes } from 'sequelize';
import { sequelize } from "../config/sequelizeInstance.js";

export const Cart = sequelize.define('Cart', {
    //Primary Key
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Refers to User model
            key: 'id',
        },
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
        validate: {
            isFloat: { msg: 'Total price must be a number' },
        },
    },
}, {
    timestamps: true,
    schema: 'test_schema',
});

