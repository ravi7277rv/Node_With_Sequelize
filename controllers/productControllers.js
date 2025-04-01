import { Product } from '../models/productModels.js';

export const createProduct = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            category,
            stock,
            brand,
            features,
            sellerId,
            storename
        } = req.body;

        if (!title || !description || !price, !category || !stock || !brand || !features || !sellerId || !storename){
            return res
                .status(400)
                .json({
                    message:"One or more fields are empty!"
                })
        }

        const product = await Product.create({
            title:title,
            description:description,
            price:price,
            category:category,
            stock:stock,
            brand:brand,
            features:features,
            sellerId:sellerId,
            storename:storename
        })

        return res
            .status(201)
            .json({
                message:"Product is created Successfully",
                product
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
