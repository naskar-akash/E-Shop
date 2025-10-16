import { Schema, model } from 'mongoose';
import dateTime from '../utils/dateTime.js';
const { date } = dateTime();

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    products: {},
    joinedDate: {
        type: String,
        default: date,
    }
});

export default model("Admin", adminSchema);