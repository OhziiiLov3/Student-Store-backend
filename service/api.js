import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("There was an error getting the products!", error);
    throw error;
  }
};

export const addItemToOrder = async (orderId, item) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/orders/${orderId}/items`,
      item
    );
    return response.data;
  } catch (error) {
    console.error("There was an error adding the item to the order!", error);
    throw error;
  }
};

export const calculateOrderTotal = async (orderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/${orderId}/total`);
    return response.data;
  } catch (error) {
    console.error("There was an error calculating the order total!", error);
    throw error;
  }
};
