import { User } from "../models/userModels.js";
import { HashPassword } from "../utils/HashPassword.js";
import { ValidateEmail } from "../utils/ValidateEmail.js";
import { ValidatePhoneNo } from "../utils/ValidatePhoneNo.js";

export const registerUser = async (req, res) => {
    try {
        const { fname, lname, email, password, phone } = req.body;
        console.log(fname, lname, email, password, phone)
        if (!fname || !lname || !email || !password || !phone) {
            return res
                .status(400)
                .json({
                    message: "One or more required fields are empty"
                })
        }

        const validEmail = ValidateEmail(email);
        console.log(validEmail)
        if (!validEmail) {
            return res
                .status(400)
                .json({
                    message: "Invalid Email Id"
                })
        }

        const isUserExist = await User.findOne({ email: email });
        console.log(isUserExist)
        if (isUserExist) {
            return res
                .status(400)
                .json({
                    message: "User exist with this email_id"
                })
        }

        const validPhone = ValidatePhoneNo(phone);
        console.log(validPhone)
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
        console.log(hashPassword)
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
                message: "A user has been created",
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

export const getAllUsers = async (req, res) => {
    try {

        const user = await User.findAll();

        return res.status(200)
            .json({
                message: "All Users has been fetched",
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