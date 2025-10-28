import axios from "axios";
import qs from "qs";


// Function to create a product
export const createProduct = async (data) => {
    try {
        
    } catch (error) {
        throw new Error(error?.response?.data?.message || error.message || "Request failed!");
    }
}