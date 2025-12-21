import dotenv from "dotenv";
dotenv.config();
import "./config/mongoose-connection.js";

import express, { json, urlencoded } from "express";
import cors from "cors";
import pkg from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import adminRoutes from "./routes/adminRouter.js";
import userRoutes from "./routes/userRouter.js";
import productRoutes from "./routes/productRouter.js";

const { json: _json } = pkg;
const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middlewares
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);
      // Allow localhost
      if (origin.startsWith("http://localhost")) {
        return callback(null, true);
      }
      // Allow all Vercel deployments
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(_json());

// Connecting routes
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
