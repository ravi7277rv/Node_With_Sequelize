import { where } from "sequelize";
import { User } from "../models/userModels.js";
import { GenerateToken } from "../utils/GenerateToken.js";
import { HashPassword } from "../utils/HashPassword.js";
import { ValidateEmail } from "../utils/ValidateEmail.js";
import { ComparePassword, ValidatePassword } from "../utils/ValidatePassword.js";
import { ValidatePhoneNo } from "../utils/ValidatePhoneNo.js";
import { config } from "dotenv";

config();

//Register Users
export const registerUser = async (req, res) => {
    try {
        const { fname, lname, email, password, phone } = req.body;
        if (!fname || !lname || !email || !password || !phone) {
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

        const isUserExist = await User.findOne({ where: { email: email } });
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
        const newUser = await User.create({
            firstname: fname,
            lastname: lname,
            email: email,
            phone: phone,
            password: hashPassword
        })

        let user = newUser.toJSON();

        return res
            .status(201)
            .json({
                message: "User registered Successfully",
            })


    } catch (error) {
        return res
            .status(500)
            .json({
                message: "Internal Server Error", error
            })
    }
}

//Login Users
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({
                    message: "Please enter your credentials!"
                })
        }

        let validEmail = ValidateEmail(email);
        if (!validEmail) {
            return res
                .status(400)
                .json({
                    message: "Invalid Email Format"
                })
        }

        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res
                .status(400)
                .json({
                    message: "User doesn't exist"
                })
        }
        let userData = user.toJSON();
        let validPassword = ValidatePassword(password, userData.password)
        if (!validPassword) {
            return res
                .status(400)
                .json({
                    message: "Invalid Credentials"
                })
        }

        let token = GenerateToken(userData);

        //options for cookies
        const options = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        return res
            .status(200)
            .cookie("token", token, options)
            .json({
                message: "User Logged In Successfully",
                token,
                userData,
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                message: "Internal Server Error",
                error: error
            })
    }
}

//Get Single User Details
export const getSingleUserDetails = async (req, res) => {
    try {
        const user = req.user;

        return res
            .status(200)
            .json({
                message: "Fetched User Details Successfully",
                user,
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                message: "Internal Server Error",
                error: error,
            })
    }
}

//LogOut User
export const logoutUser = (req, res) => {
    try {

        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })

        return res
            .status(200)
            .json({
                message: "User Logged Out Successfully",
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                message: "Internal Server Error",
                error: error,
            })
    }
}

//Get All Users
export const getAllUsers = async (req, res) => {
    try {

        const user = await User.findAll();
        return res.status(200)
            .json({
                message: "All Users Data",
                user
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                message: "Internal Server Error", error
            })
    }
}

//Update User Password
export const updateUserPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res
                .status(400)
                .json({
                    message: "Provide both password"
                })
        }

        const email = req.user.email;
        const user = await User.findOne({ where: { email: email } })
        const userDetails = user.toJSON();
        const validPassword = await ValidatePassword(oldPassword, userDetails.password);
        if (!validPassword) {
            return res
                .status(400)
                .json({
                    message: "You have entered Wrong Passowrd"
                })
        }

        const isSamePassword = ComparePassword(newPassword, userDetails.password)
        if (isSamePassword) {
            return res
                .status(400)
                .json({
                    message: "Password is same as before, Enter different new Password"
                })
        }

        let hashPassword = HashPassword(newPassword)
        await User.update(
            { password: hashPassword },
            {
                where: {
                    email: email
                }
            }
        )

        return res
            .status(200)
            .json({
                message: "Password Updated Successfully"
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                message: "Internal Server Error",
                error: error,
            })
    }
}

export const updateUserDetails = async (req, res) => {
    debugger
    try {

        const { id } = req.params;
        const { lname } = req.body;
        if (!id) {
            return res
                .status(400)
                .json({
                    message: "Id is required",
                })
        }

        if (!lname) {
            return res
                .status(400)
                .json({
                    message: "Please provide lastName"
                })
        }

        const updated = await User.update(
            { lastName: lname },
            { where: { id: parseInt(id) } }
        )

        return res
            .status(200)
            .json({
                message: "User updated successfully",
                updated
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                message: "Internal Server Error"
            })
    }
}

export const deleteUser = async (req, res) => {
    try {

        const { id } = req.params;
        if (!id) {
            return res
                .status(400)
                .json({
                    message: "Please provide the id of the user"
                })
        }

        const deletedUser = await User.destroy({
            where: { id: id }
        });

        return res
            .status(200)
            .json({
                message: "User has been deleted Successfully",
                deletedUser
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                message: "Internal Server Error", error
            })
    }
}