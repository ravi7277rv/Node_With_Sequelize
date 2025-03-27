import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

export const User = sequelize.define('User', {

  //PrimaryKey
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // User Details
  firstname: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: { msg: "User name is required" },
      len: { args: [3, 50], msg: "User name should be between 3 to 50 character" },
    },
  },
  lastname: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: { msg: "User last name is required" },
      len: { args: [3, 50], msg: "User last name should be between 3 to 50 characters" },
    },
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: { msg: "User email is required" },
      isEmail: { msg: "User email id is invalid" },
    },
    unique: true,
  },
  phone: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      notNull: { msg: "User phone is required" },
      len: { args: [10], msg: "Phone no. should be of 10 digits" },
    }
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: { msg: "User password is required" },
      min: { args: [8], msg: "Password should be atleast of 10 character" }
    }
  },
  country: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  pincode: {
    type: DataTypes.STRING(6),
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active'
  },
  resetPasswordToken :{
    type:DataTypes.TEXT,
    allowNull:true
  },
  resetPasswordTokenExpiry:{
    type:DataTypes.TEXT,
    allowNull:true
  }
}, {
  timestamps: true,
  tableName: 'users',
  schema: 'test_schema',
});






































































































