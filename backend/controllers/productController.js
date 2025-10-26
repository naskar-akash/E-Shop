import productModel from '../models/product-model.js'

export const getAllProducts = async (req,res)=>{
   try {
    const products = await productModel.find();
    if(!products) return res.status(404).json({message: "No products found"});
    return res.status(200).json(products);
   } catch (error) {
    return res.status(500).json({message: error.message});
   }
};

// Fuction to create products
export const createProducts = async ( req,res ) => {

};

// Function to delete a product
export const removeProducts = async ( req,res ) => {

};

// Function to update a product
export const updateProducts = async ( req,res ) => {

};