import userModel from "../models/user-model.js";
import productModel from "../models/product-model.js"
import genToken from "../utils/genToken.js";
import bcrypt from "bcrypt";

// Function to register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email, Login!" });
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(400).json({ message: err.message });
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.status(400).json({ message: err.message });
        const user = await userModel.create({
          name,
          email,
          password: hash,
          role,
        });
        await user.save();
        res.status(200).json({ message: "User created successfully!", user });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Function to login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Email or Password incorrect!" });
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.json({ message: err.message });
      if (result) {
        let token = genToken(user);
        res.cookie("token", token);
        res.status(201).json({ message: "Logged in!", user });
      } else {
        res.status(401).json({ message: "Email or Password incorrect!" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Function to logout a user
export const logoutUser = (req, res) => {
  try {
    res.cookie("token", "");
    res.status(201).json({ message: "Logged out successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Function to get a user
export const getUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    } else {
      res.status(200).json(user);
      console.log(req.params.name);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to add a product to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const user = await userModel.findById(req.user._id);
  const existing = user.cart.find((c) => c.product.toString() === productId);
  if (existing) {
    existing.quantity = existing.quantity + Number(quantity);
  } else {
    user.cart.push({ product: productId, quantity: Number(quantity) });
  }
  await user.save();
  return res.status(200).json({ message: "Product Added to Cart", user });
};

// Function to get cart items
export const getCartItems = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).populate('cart.product');
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    } 
    // Convert buffer to Base64
    const formattedCarts = user.cart.map((item) => ({
      ...item._doc,
      image: item.product.image
        ?  `data:${item.product.image.contentType};base64,${item.product.image.data.toString("base64")}`
        : null,
    }));
    return res.status(200).json({ cart: formattedCarts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
