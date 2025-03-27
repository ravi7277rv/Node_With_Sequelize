import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
export const GenerateToken = (user) => {
    const options = {
        expiresIn:process.env.JWT_EXPIRE
    }
    try {
        let token = jwt.sign({user:user},process.env.JWT_SECRET,options);
        return token;
    } catch (error) {
        throw new Error('Failed to generate token',error)
    }
} 