import express from 'express';
import { createOrder } from '../controllers/orderControllers.js';

const router = express.Router();

router.route("/createOrder").post(createOrder)



export default router;











