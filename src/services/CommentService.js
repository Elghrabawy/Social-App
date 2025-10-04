import axios from "axios";
import config from "../config";

export async function postComment(postId, commentBody) {
  try {
    const { data } = await axios.post(config.BASE_URL + "comments", {
      content: commentBody,
      post: postId
    }, {
      headers: {
        "token": localStorage.getItem("token")
      }
    })
    return data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
}

export async function updateCommentApi(commentId, commentBody) {
  try {
    const { data } = await axios.put(config.BASE_URL + "comments/" + commentId, {
      content: commentBody
    }, {
      headers: {
        "token": localStorage.getItem("token")
      }
    })
    console.log(data);
    return data;
  } catch (error) {
    throw error.response ? error.response.data.message : error.message;
  }
}

export async function DeleteCommentApi(postId) {
  try {
    const response = await axios.delete(config.BASE_URL + "comments/" + postId, {
      headers: {
        "token": localStorage.getItem("token")
      }
    })
    return response.data;
  } catch(error) {
    throw error.response ? error.response.data.message : error.message;
  }
}