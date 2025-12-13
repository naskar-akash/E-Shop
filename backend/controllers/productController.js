import productModel from "../models/product-model.js";

// Gettinng all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    if (!products)
      return res.status(404).json({ message: "No products found" });
    // Convert buffer to Base64
    const formattedProducts = products.map((product) => ({
      ...product._doc,
      image: product.image
        ?  `data:${product.image.contentType};base64,${product.image.data.toString("base64")}`
        : null,
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get product by Id
export const getProductById = async (req, res) => {
  try {
    const {id} = req.params;
    const product =  await productModel.findById(id);
    if(!product) return res.status(404).json({message:"Product not found"});
    // Convert buffer to Base64
    const formattedProduct = {
      ...product._doc,
      image: product.image
        ? `data:${product.image.contentType};base64,${product.image.data.toString("base64")}`
        : null,
    };
    res.status(200).json(formattedProduct);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}

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
      admin: req.user._id,
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
    res.status(200).json({ message: "Product removed!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Function to update a product
export const updateProducts = async (req, res) => {};