import { makeRequest } from "./makeRequest"
import useAuth from "../hooks/useAuth"

export function createComment({ uId, postId, content, responseCommentId }) {
  console.log(uId)
  console.log(postId)
  console.log(content)
  console.log(responseCommentId)

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

// export function updateComment({ postId, message, id }) {
//   return makeRequest(`posts/${postId}/comments/${id}`, {
//     method: "PUT",
//     data: { message },
//   })
// }

export function deleteComment({ commentId}) {
  return makeRequest(`Posts/delete/comment/${commentId}`, {
    method: "DELETE",
    withCredentials: true,
  })
}
