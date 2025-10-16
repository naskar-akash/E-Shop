import adminModel from "../models/admin-model.js";
import bcrypt from "bcrypt";
import genToken from "../utils/genToken.js";
import productModel from "../models/product-model.js";

// Function to register a new admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin has already registered!" });
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(400).json({ message: err.message });
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.status(400).json({ message: err.message });
        const admin = await adminModel.create({ name, email, password: hash });
        await admin.save();
        res.status(200).json({ message: "Admin registered!", admin });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Function to login an admin
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await adminModel.findOne({email});
        if (!admin) return res.status(401).json({message: "Email or Password incorrect!"});
        bcrypt.compare( password, admin.password, (err, result) => {
            if (err) return res.json({message: err.message});
            if (result) {
                let token = genToken(admin);
                res.cookie("admin-token", token);
                res.status(201).json({message: "Logged in!"});
            } else {
                res.status(401).json({message: "Email or Password incorrect!"})
            };
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

// Function to create products
export const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, photo } = req.body;
    if (!name || !description || !category || !price) {
      return res.status(400).json({ message: "All fields are required!"});
    }
    const existingProduct = await productModel.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists!"});
    }
    const product = await productModel.create({ name,description,category,price,photo });
    await product.save();
    res.status(200).json({ message: "Product created!", product });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

// Function to remove a product by id
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json({ message: "Product removed!", product });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}
