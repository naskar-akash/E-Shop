import { Schema, model } from 'mongoose';
import dateTime from '../utils/dateTime.js';
const { date } = dateTime();

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0
    },
    admin: {},
    addedDate: {
        type: String,
        default: date,
    },
});

export default model("Product", productSchema);