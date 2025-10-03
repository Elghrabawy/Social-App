import axios from "axios";
import config from "../config";

export async function postComment(postId, commentBody) {
    try {
        const {data} = await axios.post(config.BASE_URL + "comments", {
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