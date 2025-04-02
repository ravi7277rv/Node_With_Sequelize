import { where } from "sequelize";
import { User } from "../models/userModels.js";
import { GenerateToken } from "../utils/GenerateToken.js";
import { HashPassword } from "../utils/HashPassword.js";
import { ValidateEmail } from "../utils/ValidateEmail.js";
import { ComparePassword, ValidatePassword } from "../utils/ValidatePassword.js";
import { ValidatePhoneNo } from "../utils/ValidatePhoneNo.js";
import { config } from "dotenv";
import { ResetPasswordTokenGeneration } from "../utils/ResetPasswordTokenGeneration.js";
// import { SendEmail } from "../utils/SendEmail.js";

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

        const user = newUser.toJSON();

        return res
            .status(201)
            .json({
                message: "User registered Successfully",
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
        let validPassword = await ValidatePassword(password, userData.password)
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

//Forget Password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res
                .status(400)
                .json({
                    message: "Enter your email, which linked with account."
                })
        }

        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res
                .status(404)
                .json({
                    message: "User does not exist"
                })
        }

        //Handled the token generation for resetpassword
        const { resetToken, tokenExpiry } = ResetPasswordTokenGeneration();
        console.log(resetToken, tokenExpiry)

        await User.update(
            {
                resetPasswordToken: resetToken,
                resetPasswordTokenExpiry: tokenExpiry.toString()
            },
            {
                where: {
                    email: email
                }
            }
        )

        //Generating URL for the password reset
        const resetPasswordURL = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
        const htmlContent = `Your password reset URL is :- \n\n ${resetPasswordURL} \n\n If you have not requested then please ignore it.`;

        // const sendEmailResponse = await SendEmail(email, htmlContent);
        // return res
        //     .status(200)
        //     .json({
        //         message: `A mail has been sent to your gmail accout for password resetting.`,
        //         sendEmailResponse
        //     })
    } catch (error) {

    }
}

//Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        if (!password) {
            return res
                .status(400)
                .json({
                    message: "Please Enter your Password"
                })
        }
        const token = req.params.resetToken;
        const user = await User.findOne({ where: { resetPasswordToken: token } })
        if (!user) {
            return res
                .status(404)
                .json({
                    message: "User doesn't exist"
                })
        }
        const userDetails = user.toJSON()
        const currentTime = new Date().getTime();
        const expireTime = user.resetPasswordTokenExpiry;
        if (expireTime < currentTime) {
            return res
                .status(400)
                .json({
                    message: "Password reset token has expired. \n\n Please request a new password reset link."
                })
        }

        let hashPassword = HashPassword(password);
        await User.update(
            {
                password: hashPassword,
                resetPasswordToken: null,
                resetPasswordTokenExpiry: null
            },
            {
                where: {
                    email: userDetails.email
                }
            }
        )

        return res
            .status(200)
            .json({
                message: `Password reset successfully`
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

//Update User Details
export const updateUserDetails = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res
                .status(400)
                .json({
                    message: "Id is required",
                })
        }

        const { firstname, lastname, email, phone } = req.body;
        if (!firstname || !lastname || !email || !phone) {
            return res
                .status(400)
                .json({
                    message: "Enter your Details"
                })
        }

        const isValidEmail = ValidateEmail(email);
        if(!isValidEmail){
            return res
                .status(400)
                .json({
                    message:"Invalid email formate"
                })
        }

        const isValidPhone = ValidatePhoneNo(phone);
        if(!isValidPhone){
            return res
                .status(400)
                .json({
                    message:"Phone no. should be of 10 digits only."
                })
        }

        await User.update(
            {
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone,
            },
            {
                where: {
                    id: parseInt(id)
                }
            }
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

//Delete an User Profile
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