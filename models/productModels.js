import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelizeInstance.js";

export const Product = sequelize.define('Product', {

    //Primary Key
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    //Product Details
    title: {
        type: DataTypes.STRING(250),
        allowNull: false,
        validate: {
            notNull: { msg: "Product name is required" },
            len: { args: [3, 200], msg: "Product name should be more than 3 characters" }
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: "Product description is required",
        },
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notNull: { msg: "Product price is required" },
        },
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: { msg: "Product category is required" },
        },
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "Product stock is required" },
        },
    },
    brand: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: { msg: "Product brand is required" },
        },
    },
    ratings: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    numOfReviews: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    features: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    specifications: {
        type: DataTypes.TEXT,
    },
    sellerId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Sellers',
            key:'id'
        },
    },
    storeName: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true,
    schema: 'test_schema',
  })







































































































































