import express from 'express';
import { registerSeller } from '../controllers/sellerControllers.js';

const router = express.Router();

router.route("/registerSeller").post(registerSeller);


export default router;