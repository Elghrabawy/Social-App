import axios from "axios";
import config from "../config";

export async function FetchPosts(pageNumber) {
  // !don't forget handle the token is exist in local storage and network errors
  try {
    const response = await axios.get(config.BASE_URL + "posts", {
      headers: {
        "token": localStorage.getItem("token")
      },
      params: {
        page: pageNumber
      }
    })
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
}

export async function FetchSinglePost(postId) {
  try {
    const response = await axios.get(config.BASE_URL + "posts/" + postId, {
      headers: {
        "token": localStorage.getItem("token")
      }
    })
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response ? error.response.data.error : error.message;
  }
}

export async function AddNewPost(data) {
  try {
    const response = await axios.post(config.BASE_URL + "posts", data, {
      headers: {
        "token": localStorage.getItem("token")
      }
    })
    return response.data;
  } catch (error) {

    throw error.response ? error.response.data.message : error.message;
  }
}
export async function EditPost(postId, data) {
  try {
    const response = await axios.put(config.BASE_URL + "posts/" + postId, data, {
      headers: {
        "token": localStorage.getItem("token")
      }
    })
    return response.data;
  } catch (error) {

    throw error.response ? error.response.data.message : error.message;
  }
}

export async function DeletePostApi(postId) {
  try {
    const response = await axios.delete(config.BASE_URL + "posts/" + postId, {
      headers: {
        "token": localStorage.getItem("token")
      }
    })
    return response.data;
  } catch(error) {
    throw error.response ? error.response.data.message : error.message;
  }
}