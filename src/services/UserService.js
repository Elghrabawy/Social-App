import axios from "axios";
import config from "../config";

export async function getLoggedUserDataApi() {
  try {
    const response = axios.get(config.BASE_URL + 'users/profile-data', {
      headers: {
        "token": localStorage.getItem("token"),
      }
    })

    return response;
  } catch (error) {
    throw "user info error";
  }
}