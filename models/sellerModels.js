import { DataTypes } from 'sequelize';
import { sequelize } from "../config/sequelizeInstance.js";

export const Seller = sequelize.define('Seller', {
    //Primary Key
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
    },
    ownerName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Enter the seller name' },
            notEmpty: { msg: 'Enter the seller name' },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: 'Enter a valid email address' },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Password is required' },
            len: {
                args: [6, 100],
                msg: 'Password must be at least 6 characters',
            },
        },
    },
    storeName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: 'Enter the store name' },
            notEmpty: { msg: 'Enter the store name' },
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Enter the phone number' },
            isNumeric: { msg: 'Phone number must be numeric' },
        },
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
   
}, {
    timestamps: true,
    schema: 'test_schema',
  });

