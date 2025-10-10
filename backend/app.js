import dotenv from 'dotenv';
dotenv.config();
import './config/mongoose-connection.js';

import express, { json, urlencoded } from 'express';
import cors from 'cors';
import pkg from 'body-parser';
import cookieParser from "cookie-parser";

import adminRoutes from './routes/adminRouter.js';
import userRoutes from './routes/userRouter.js';
import productRoutes from './routes/productRouter.js';

const { json: _json } = pkg;
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(_json());

// Connecting routes
app.use('/admin', adminRoutes);
app.use('/', userRoutes);
app.use('/product', productRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
