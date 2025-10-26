import { Router } from 'express';
const router = Router();
import { getAllProducts, createProducts, removeProducts, updateProducts } from '../controllers/productController.js';
import isAdmin from '../middleware/isAdmin.js'
import isLogged from '../middleware/isLogged.js'

// Route to get all products
router.get("/", getAllProducts);

// Route to create products
router.post("/create", isLogged, isAdmin, createProducts);

// Route to remove a product
router.delete("/remove/:id", isLogged, isAdmin, removeProducts)

// Route to update a product
router.put("/update/:id", isLogged, isAdmin, updateProducts)

export default router;