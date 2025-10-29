import axios from "axios";
import qs from "qs";

// Function to create a product
export const createProducts = async (_data) => {
  try {
    const formData = new FormData();
    formData.append("image", _data.image[0]); // Append the file
    formData.append("name", _data.name);
    formData.append("description", _data.description);
    formData.append("category", _data.category);
    formData.append("price", _data.price);
    formData.append("discount", _data.discount);

    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/admin/create`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error.message || "Request failed!"
    );
  }
};

// Function to show all created products by an admin
export const getAllProducts = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/admin/`,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error.message || "Request failed!"
    );
  }
};
