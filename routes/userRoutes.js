import express from 'express';
import { deleteUser, forgotPassword, getAllUsers, getSingleUserDetails, loginUser, logoutUser, registerUser, resetPassword, updateUserDetails, updateUserPassword } from '../controllers/userControllers.js';
import { AuthorizeRole, IsAuthenticated } from '../middlewares/IsAuthenticated.js';

const router = express.Router();

//User Routes
router.route("/createUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/getSingleUserDetails").get(IsAuthenticated,getSingleUserDetails);
router.route("/updateUserPassword").post(IsAuthenticated,updateUserPassword);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:resetToken").post(resetPassword);
router.route("/updateUserDetails/:id").post(updateUserDetails);
router.route("/deleteUser/:id").delete(deleteUser);
router.route("/logoutUser").get(IsAuthenticated,logoutUser);

//Admin Routes
router.route("/getAllUsers").get(IsAuthenticated,AuthorizeRole('admin'),getAllUsers);

export default router;





























