import axios from "axios";
import qs from "qs";

//Function to fetch register user API
export const registerUser = async (_data) => {
  try {
    const data = qs.stringify({
        name: _data.name,
        email: _data.email,
        password: _data.password,
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      withCredentials: true,
      url: `${import.meta.env.VITE_SERVER_URL}/user/register`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    const response = await axios.request(config);
    return response;
  } catch (error) {
    throw error;
  }
};

//Function to fetch login user API
export const loginUser = async (_data) => {
  try {
    const data = qs.stringify({
      email: _data.email,
      password: _data.password,
    })
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/login`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//Function to fetch logout user API
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/logout`, {}, {
      withCredentials: true,
    });
    return response;  
  } catch (error) {
    throw error;
  }
}
