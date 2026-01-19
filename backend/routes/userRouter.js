import { Router } from "express";
const router = Router();
import isLogged from "../middleware/isLogged.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  addToCart,
  getCartItems,
  removeCartItems,
  userAddress,
  placeOrder,
  viewOrder,
  removeOrder,
  updateProfilePic,
} from "../controllers/userController.js";
import upload from "../config/multer-config.js";

// Route to create a new user
router.post("/register", registerUser);

// Route to set user address
router.post("/address", isLogged, userAddress);

// Route to login user
router.post("/login", loginUser);

// Route to logout a user
router.post("/logout", logoutUser);

// Route to get a user by email
router.get("/profile", isLogged, getUser);

// Route to add a product to cart
router.post("/cart/items", isLogged, addToCart);

// Route to get cart items
router.get("/cart", isLogged, getCartItems);

// Route to remove cart items
router.delete("/cart/:id", isLogged, removeCartItems);

// Route to place order
router.post("/order/:id", isLogged, placeOrder);

// Route to view placed orders
router.get("/order", isLogged, viewOrder)

// Route to remove placed orders
router.delete("/order/:id", isLogged, removeOrder)

// Route to update user profile picture
router.put("/profile/pic", isLogged, upload.single("profilePic"), updateProfilePic);

export default router;
