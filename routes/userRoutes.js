import express from 'express';
import { deleteUser, getAllUsers, registerUser, updateUserDetails } from '../controllers/userController.js';

const router = express.Router();

router.route("/createUser").post(registerUser);
router.route("/getAllUsers").get(getAllUsers);
router.route("/updateUser/:id").post(updateUserDetails);
router.route("/deleteUser/:id").delete(deleteUser)

export default router;





























