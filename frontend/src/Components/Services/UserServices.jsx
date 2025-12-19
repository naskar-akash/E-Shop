import axios from "axios";
import qs from "qs";

//Function to fetch register user API
export const registerUser = async (name, email, password, role) => {
  try {
    const data = qs.stringify({ name, email, password, role });
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/register`,
      data,
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

// Function to fetch set address API
export const setUserAddress = async (_data) => {
  try {
    const data = qs.stringify({address: _data.address, pincode: _data.pincode})
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/address`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return response;
  } catch (error) {
    throw error;
  }
}

//Function to fetch login user API
export const loginUser = async (_data) => {
  try {
    const data = qs.stringify({
      email: _data.email,
      password: _data.password,
    });
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/login`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Function to fetch logout user API
export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to fetch user profile API
export const getUserProfile = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/user/profile`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to add a product to Cart
export const addToCart = async (productId, quantity) => {
  const data = qs.stringify({
    productId: productId,
    quantity: quantity,
  });
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/cart/items`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to get cart items
export const getCartItems = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/user/cart`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to delete item totally from cart
export const removeCartItem = async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/user/cart/${id}`,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

// Function to add items to order list
export const placeOrder = async (_data) => {
  try {
    const data = qs.stringify({
      quantity: _data.quantity, totalAmount: _data.totalAmount, paymentMode: _data.paymentMode, addDay: _data.addDay
    });
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/order/${_data.id}`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

// Function to view placed Orders
export const viewOrder = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/order`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error;
    
  }
};

// Function to remove order from list
export const removeOrder = async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/user/order/${id}`,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

