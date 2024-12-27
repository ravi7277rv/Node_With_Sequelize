import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { DBConnection } from './config/dbConnection.js';
import { config } from 'dotenv';
config();
DBConnection();

const app = express();

app.use(bodyParser.json({limit:"10mb"}));
app.use(bodyParser.urlencoded({limit:"10mb", extended:false}));
app.use(cors());

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

//using the router 
app.use("/api/v1",user)


app.listen(process.env.PORT,() => {
    console.log(`Server is running on http://127.0.0.1:${process.env.PORT}`);
})


























































































































































































