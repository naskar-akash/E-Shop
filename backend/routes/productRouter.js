import { Router } from 'express';
const router = Router();
import { getAllProducts, getProductById } from '../controllers/productController.js';
import isLogged from '../middleware/isLogged.js';


// Route to get all products
router.get("/", getAllProducts);

// Route to get a single product by ID
router.get("/:id", isLogged, getProductById);

export default router;