import express from 'express';
import { AddItemToCart } from '../controllers/cartControllers.js';

const router = express.Router();

router.route("/addItemToCart").post(AddItemToCart);


export default router;























