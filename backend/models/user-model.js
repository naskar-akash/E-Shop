import { Schema, model } from 'mongoose';
import dateTime from '../utils/dateTime.js';
const { date, time } = dateTime();

const userSchema = new Schema({
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
    profilePic: {
        type: String,
    },
    cart: {},
    joinedDate: {
        type: String,
        default: date,
    },
    joinedTime: {
        type: String,
        default: time,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
});

export default model("User", userSchema);