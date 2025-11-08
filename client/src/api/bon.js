import axios from "axios";
import { API_URL } from "./contants";

export async function newBon(bon, total, client) {
  if (!bon || bon.length === 0 || !total)
    return { status: 10, message: "params are empty" };
  try {
    const { status, data } = await axios.post(`${API_URL}/bon`, {
      products: bon,
      total,
      clientId: client,
    });
    return { status, data };
  } catch (error) {
    console.log(error);
    if (error.response)
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    return { status: 10, message: error.message };
  }
}
