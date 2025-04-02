//Some of the imports for running the Server
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { DBConnection } from './config/dbConnection.js';
import { config } from 'dotenv';

//Configuring the env file
config();

//Calling the database connection
DBConnection();

//Initializing the express application
const app = express();

//Useing middlewares
app.use(bodyParser.json({limit:"10mb"}));
app.use(bodyParser.urlencoded({limit:"10mb", extended:false}));
app.use(cors());
app.use(cookieParser());
app.use(fileUpload())

//default route for checking whether api is running or not
app.get("/", (req, res) => {
    return res
        .status(200)
        .json({
            message:"API is running....!"
        })
});

//importing the route
import user from './routes/userRoutes.js';
import seller from './routes/sellerRoutes.js';
import product from './routes/productRoutes.js';
import cart from './routes/cartRoutes.js';
import order from './routes/orderRoutes.js';

//using the router 
app.use("/api/v1",user);
app.use("/api/v1",seller);
app.use("/api/v1",product);
app.use("/api/v1",cart);
app.use("/api/v1",order);

//Server is running 
app.listen(process.env.PORT,() => {
    console.log(`Server is running on http://127.0.0.1:${process.env.PORT}`);
})


























































































































































































