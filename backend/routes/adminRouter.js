import { Router } from 'express';
const router = Router();
import { loginUser, registerUser } from '../controllers/userController.js';

// Route to create a new admin
router.post("/create", registerUser);

// Route to login admin
router.post("/login", loginUser);

export default router;