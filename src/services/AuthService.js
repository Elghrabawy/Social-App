import axios from "axios";
import config from "../config";

export async function registerUserAPI(formData) {
  try {
    const response = await axios.post(config.BASE_URL + "users/signup", formData);
    return {
      type: "success",
      message: "user added successfully",
    };
  } catch (error) {
    let errorMessage = "an unexpected error occurred.";
    if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    }

    return {
      type: "error",
      message: errorMessage,
    };
  }
}
export async function loginUserAPI(formData) {
  try {
    const response = await axios.post(config.BASE_URL + "users/signin", formData);
    return {
      type: "success",
      message: "user logged successfully",
      token: response.data.token,
    };
  } catch (error) {
    let errorMessage = "an unexpected error occurred.";
    if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    }

    return {
      type: "error",
      message: errorMessage,
    };
  }
}
