import axios from "axios";
import { API_URL } from "../contants.js";
export async function addProduct(product) {
  try {
    const { status, data } = await axios.post(`${API_URL}/product`, product);
    return { status, data };
  } catch (error) {
    console.log(error);
    if (error.response)
      return {
        data: error.response.data.message,
        status: error.response.status,
      };
    return { status: 10, data: error.message };
  }
}

export async function updateData(product) {
  try {
    const { status, data } = await axios.put(`${API_URL}/product`, product);
    return { status, data };
  } catch (error) {
    console.log(error);
    if (error.response)
      return {
        data: error.response.data.message,
        status: error.response.status,
      };
    return { status: 10, data: error.message };
  }
}

export async function getProduct() {
  try {
    const { status, data } = await axios.get(`${API_URL}/product`);
    return { status, data };
  } catch (error) {
    console.log(error);
    if (error.response)
      return {
        data: error.response.data.message,
        status: error.response.status,
      };
    return { status: 10, data: error.message };
  }
}
export async function searchProduct(query) {
  try {
    const { status, data } = await axios.get(
      `${API_URL}/product/search/${query}`
    );
    return { status, data };
  } catch (error) {
    console.log(error);
    if (error.response)
      return {
        data: error.response.data.message,
        status: error.response.status,
      };
    return { status: 10, data: error.message };
  }
}
