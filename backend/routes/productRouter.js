import { Router } from 'express';
const router = Router();
import { getAllProducts } from '../controllers/productController.js';


// Route to get all products
router.get("/", getAllProducts);

export default router;