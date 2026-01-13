import { Schema, model } from 'mongoose';
import dateTime from '../utils/dateTime.js';
import base64Image  from '../utils/convertToBase64.js'
const { date } = dateTime();

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
    data: {
      type: Buffer,
      default: Buffer.from(base64Image.product, "base64"),
    },
    contentType: {
      type: String,
      default: "image/jpeg",
    },
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
    admin: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    addedDate: {
        type: String,
        default: date,
    },
});

export default model("Product", productSchema);