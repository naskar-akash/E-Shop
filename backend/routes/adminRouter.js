import { Router } from 'express';
const router = Router();
import { loginAdmin, registerAdmin, createProduct, removeProduct } from '../controllers/adminController.js';

// Route to create a new admin
router.post("/register", registerAdmin);

// Route to login admin
router.post("/login", loginAdmin);

// Route to create products
router.post("/create", createProduct)

//Route to remove a product by id
router.delete("/remove/:id", removeProduct)

export default router;