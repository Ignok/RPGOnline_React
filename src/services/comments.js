import { makeRequest } from "./makeRequest"
import useAuth from "../hooks/useAuth"

export function createComment({ uId, postId, content, responseCommentId }) {
  return makeRequest(`Posts/${postId}/Comment`, {
    method: "POST",
    withCredentials: true,
    data: {
      responseCommentId : responseCommentId,
      uId : uId,
      content : content
     },
  })
}

export function deleteComment({ commentId}) {
  return makeRequest(`Posts/delete/comment/${commentId}`, {
    method: "DELETE",
    withCredentials: true,
  })
}
