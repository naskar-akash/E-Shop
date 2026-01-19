import userModel from "../models/user-model.js";
import genToken from "../utils/genToken.js";
import bcrypt from "bcrypt";
import deliveryDate from "../utils/deliveryDate.js";
import dateTime from "../utils/dateTime.js";

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

// Function to set up address of a user
export const userAddress = async (req, res) => {
  try {
    const { address, pincode } = req.body;
    if (!address || !pincode) {
      return res.status(400).json({
        message: "Address and Pincode are necessary",
      });
    }
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { address, pincode },
      { new: true }
    );
    return res.status(200).json({
      message: "Address set successfully!",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none", // if frontend and backend are on different domains
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
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
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found!" });
    // Convert buffer to Base64
    const formattedUser = {
      ...user._doc,
      profilePic: user.profilePic
        ? `data:${user.profilePic.contentType};base64,${user.profilePic.data.toString(
            "base64"
          )}`
        : null,
    };
    res.status(200).json(formattedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to add a product to cart
export const addToCart = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get cart items
export const getCartItems = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .populate("cart.product");
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    // Convert buffer to Base64
    const formattedCarts = user.cart.map((item) => ({
      ...item._doc,
      image: item.product.image
        ? `data:${
            item.product.image.contentType
          };base64,${item.product.image.data.toString("base64")}`
        : null,
    }));
    return res.status(200).json({ cart: formattedCarts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Function to remove cart items
export const removeCartItems = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(req.user._id);
    const cartById = user.cart.find((c) => c._id == id);
    if (!cartById) {
      return res.status(404).json({ message: "Item not found!" });
    } else {
      await userModel.findByIdAndUpdate(req.user._id, {
        $pull: { cart: { _id: id } },
      });
      res.status(200).json({ message: "Item deleted successfully!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to place order
export const placeOrder = async (req, res) => {
  try {
    const { date, time } = dateTime();
    const { id } = req.params;
    const { quantity, totalAmount, paymentMode, addDay } = req.body;
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          orders: {
            product: id,
            quantity: Number(quantity),
            totalAmount,
            paymentMode,
            orderDate: `${date} ${time}`,
            deliveryDate: deliveryDate(date, addDay),
          },
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Order placed successfully! Check your orders!", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to view placed order
export const viewOrder = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .populate("orders.product");
    if (!user) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Convert buffer to base64
    const formattedOrders = user.orders.map((item) => ({
      ...item._doc,
      product: {
        ...item.product._doc,
        image: item.product.image
          ? `data:${
              item.product.image.contentType
            };base64,${item.product.image.data.toString("base64")}`
          : null,
      },
    }));
    return res.status(200).json({ orders: formattedOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to remove placed order
export const removeOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { orders: { _id: id } },
      },
      { new: true }
    );
    res.status(200).json({ message: "Order removed successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to update user profile picture
export const updateProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        profilePic: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Profile picture updated successfully!", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
