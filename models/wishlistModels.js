import { DataTypes } from 'sequelize';
import { sequelize } from "../config/sequelizeInstance.js";

export const Wishlist = sequelize.define('Wishlist', {
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
}, {
    timestamps: true,
    schema: 'test_schema',
  });

