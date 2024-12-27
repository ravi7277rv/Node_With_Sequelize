import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

//database details
let database_name = process.env.DB_NAME;
let username = process.env.DB_USERNAME;
let password = process.env.DB_PASSWORD;
let host = process.env.DB_HOST;
let dialect = process.env.DB_DIALECT;

//creating a new sequelize instance
export const sequelize = new Sequelize(database_name,username,password,{
    host:host,
    dialect:dialect
});

export const DBConnection = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.log('Unable to connect to the database :',error)
    }
}

