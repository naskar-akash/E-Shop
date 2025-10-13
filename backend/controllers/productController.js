import productModel from '../models/product-model.js'

export const getAllProducts = async (req,res) => {
    console.log(req);
    const products = productModel.find(req.user)
};