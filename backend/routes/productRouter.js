import { Router } from 'express';
const router = Router();
import { getAllProducts } from '../controllers/productController.js';
import isLogged from '../middleware/isLogged.js';


// Route to get all products
router.get("/", isLogged, getAllProducts);

export default router;