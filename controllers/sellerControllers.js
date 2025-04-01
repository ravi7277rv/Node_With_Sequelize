import { Seller } from '../models/sellerModels.js';
import { HashPassword } from "../utils/HashPassword.js";
import { ComparePassword, ValidatePassword } from "../utils/ValidatePassword.js";
import { ValidatePhoneNo } from "../utils/ValidatePhoneNo.js";
import { ValidateEmail } from "../utils/ValidateEmail.js";
import { config } from "dotenv";

config();

//Register Users
export const registerSeller = async (req, res) => {
    try {
        const { name, email, password, storeName, phone, address } = req.body;
        if (!name || !email || !password || !storeName || !phone || !address) {
            return res
                .status(400)
                .json({
                    message: "One or more required fields are empty"
                })
        }

        const validEmail = ValidateEmail(email);
        if (!validEmail) {
            return res
                .status(400)
                .json({
                    message: "Invalid Email Id"
                })
        }

        const isUserExist = await Seller.findOne({ where: { email: email } });
        if (isUserExist) {
            return res
                .status(400)
                .json({
                    message: "User exist with this email"
                })
        }

        const validPhone = ValidatePhoneNo(phone);
        if (!validPhone) {
            return res
                .status(400)
                .json({
                    message: "Phone no. should be of 10 digits"
                })
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    message: "Password should be more than 8 chars"
                })
        }
        const hashPassword = HashPassword(password);
        const newUser = await Seller.create({
            name: name,
            email: email,
            password: hashPassword,
            storeName: storeName,
            phone: phone,
            address: address
        })

        const seller = newUser.toJSON();

        return res
            .status(201)
            .json({
                message: "Seller registered Successfully",
            })


    } catch (error) {
        return res
            .status(500)
            .json({
                message: "Internal Server Error", error
            })
    }
}