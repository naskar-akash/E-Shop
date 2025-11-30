import { Router } from 'express';
const router = Router();
import isLogged from '../middleware/isLogged.js'
import { registerUser, loginUser, logoutUser, getUser,addToCart, getCartItems } from '../controllers/userController.js';

// Route to create a new user
router.post("/register", registerUser);

// Route to login user
router.post("/login", loginUser)

// Route to logout a user
router.post("/logout", logoutUser)

// Route to get a user by email
router.get("/profile",isLogged, getUser);

// Route to add a product to cart
router.post("/cart/items", isLogged, addToCart)

// Route to get cart items
router.get("/cart", isLogged, getCartItems);

export default router;