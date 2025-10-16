import { Schema, model } from 'mongoose';
import dateTime from '../utils/dateTime.js';
const { date, time } = dateTime();

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
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
    users: {},
    addedDate: {
        type: String,
        default: date,
    },
});

export default model("Product", productSchema);