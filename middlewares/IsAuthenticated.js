import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { User } from '../models/userModels.js';

config();

export const IsAuthenticated = async (req, res, next) => {
    let tokenFromHeaders = req.headers.authorization;
    let tokenFromCookies = req.cookies.token;

    if (!tokenFromHeaders || !tokenFromCookies) {
        return res.status(401).json({
            message: "You are Unauthorized"
        })
    }

    if (tokenFromHeaders !== tokenFromCookies) {
        return res
            .status(400)
            .json({
                message: "Invalid Token"
            })
    }
    try {
        let decoded = jwt.verify(tokenFromHeaders, process.env.JWT_SECRET);
        let id = decoded.user._id;
        const user = await User.findOne({_id:id});
        if(!user){
            return res  
                .status(401)
                .json({
                    message:"User not found"
                })
        }
        req.user = user;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({
                message: "Invalid token"
            })
    }
}


export const AuthorizeRole = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res
                .status(403)
                .json({
                    message:"Access denied. You didn't have permission."
                })
        }
        next();
    }
}


















