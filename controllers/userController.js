import { User } from "../models/userModels.js";

export const registerUser = async (req, res) => {
    try {
debugger
        const { fname, lname, email_id } = req.body;
        console.log(fname, lname, email_id)
        if (!fname || !lname || !email_id) {
            return res.status(400)
                .json({
                    message: "Please provide your detials"
                })
        }

        const newUser = await User.create({
            firstName: fname,
            lastName: lname,
            email: email_id
        })

        let user = newUser.toJSON();

        return res
            .status(201)
            .json({
                message:"A user has been created",
                user
            })


    } catch (error) {
        return res
            .status(500)
            .json({
                message: "Internal Server Error",error
            })
    }
}

export const getAllUsers = async(req, res) => {
    try {

        const user = await User.findAll();

        return res.status(200)
            .json({
                message:"All Users has been fetched",
                user
            })
        
    } catch (error) {
        return res
            .status(500)
            .json({
                message:"Internal Server Error",error
            })
    }
}

export const updateUserDetails = async(req, res) => {
    debugger
    try {

        const { id } = req.params;
        const {lname} = req.body;
        if(!id){
            return res
                .status(400)
                .json({
                    message:"Id is required",
                })
        }

        if(!lname){
            return res
                .status(400)
                .json({
                    message:"Please provide lastName"
                })
        }

        const updated = await User.update(
            {lastName: lname},
            {where : {id : parseInt(id)}}
        )

        return res
            .status(200)
            .json({
                message:"User updated successfully",
                updated
            })
        
    } catch (error) {
        return res
            .status(500)
            .json({
                message:"Internal Server Error"
            })
    }
}

export const deleteUser = async(req, res) => {
    try {

        const { id } = req.params;
        if(!id){
            return res
                .status(400)
                .json({
                    message:"Please provide the id of the user"
                })
        }

        const deletedUser = await User.destroy({
            where:{id : id}
        });

        return res
            .status(200)
            .json({
                message:"User has been deleted Successfully",
                deletedUser
            })
        
    } catch (error) {
        return res
            .status(500)
            .json({
                message:"Internal Server Error",error
            })
    }
}