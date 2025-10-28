import productModel from "../models/product-model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    if (!products)
      return res.status(404).json({ message: "No products found" });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Fuction to create products
export const createProducts = async (req, res) => {
  try {
    const { name, description, category, price, discount } = req.body;

    const products = await productModel.create({
      name,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      description,
      category,
      price,
      discount,
    });
    res
      .status(201)
      .json({ message: "Product created successfully!", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to delete a product
export const removeProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json({ message: "Product removed!", product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Function to update a product
export const updateProducts = async (req, res) => {};
