import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

export const User = sequelize.define('User', {
    // Define attributes (columns)
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
  
  // Sync the model with the database
  (async () => {
    await sequelize.sync();
    console.log('The User table has been created.');
  })();





































































































