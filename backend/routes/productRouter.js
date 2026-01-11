import { Router } from 'express';
const router = Router();
import { getAllProductsAdmin, getProductById, getSearchedProduct } from '../controllers/productController.js';
import isLogged from '../middleware/isLogged.js';


// Route to get all products
router.get("/", getAllProductsAdmin);

// Route to get each pproduct by searching its name
router.get("/search", getSearchedProduct);

// Route to get a single product by ID
router.get("/:id", isLogged, getProductById);

export default router;