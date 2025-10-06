import { API_URL } from "../contants";
import axios from "axios";

export async function getUsers() {
  try {
    const { status, data } = await axios.get(`${API_URL}/admin/users`);
    return { status, data };
  } catch (err) {
    console.log(err.message);
    if (err.response)
      return { status: err.response.status, message: err.response.message };
    return { status: 10, message: err.message };
  }
}

export async function addUsers(user) {
  try {
    const { status, data } = await axios.post(`${API_URL}/admin`, user);
    return { status, data };
  } catch (err) {
    console.log(err.message);
    if (err.response)
      return { status: err.response.status, message: err.response.data.message };
    return { status: 10, message: err.message };
  }
}
