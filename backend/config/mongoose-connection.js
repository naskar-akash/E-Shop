import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
const mongodbURI = `${process.env.MONGODB_URL}`;

(
    async () => {
        try {
            const response = await mongoose.connect(mongodbURI);
            console.log(`Database connected to ${response.connection.name} at ${response.connection.host}`);
        } catch (error) {
            console.log("Database connection error: ",error);
        }
    }
)();

export default mongoose.connection;