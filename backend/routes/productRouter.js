import { Router } from 'express';
const router = Router();
import isLogged from '../middleware/isLogged.js';
import { getAllProducts } from '../controllers/productController.js';

// Route to get all products
router.get("/", isLogged, getAllProducts);

export default router;