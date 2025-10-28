import { Router } from 'express';
const router = Router();
import { getAllProducts,createProducts, removeProducts } from '../controllers/productController.js';
import isAdmin from '../middleware/isAdmin.js'
import isLogged from '../middleware/isLogged.js'
import upload from "../config/multer-config.js"

// Route to show all created products by an admin
router.get("/", isLogged, isAdmin, getAllProducts)

// Route to create products
router.post("/create", upload.single("image"), isLogged, isAdmin, createProducts)

//Route to remove a product by id
router.delete("/remove/:id", isLogged, isAdmin, removeProducts)

export default router;