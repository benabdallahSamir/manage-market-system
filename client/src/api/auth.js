import axios from "axios";
import { API_URL } from "./contants";
export async function login(username, password) {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      username: username,
      password,
    });
    console.log(res)
    return { status: res.status, data: res.data };
  } catch (error) {
    console.log(error);
    if (error.response)
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    return { status: 10 };
  }
}
