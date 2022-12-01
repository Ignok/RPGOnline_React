import { makeRequest } from "./makeRequest"

export function createComment({ postId, content, responseCommentId }) {
  console.log(postId)
  console.log(content)
  console.log(responseCommentId)

  return makeRequest(`Posts/${postId}/Comment`, {
    method: "POST",
    data: {
      responseCommentId : responseCommentId,
      uId : 1,  //do zmiany, teraz dodane na sztywno
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

// export function deleteComment({ postId, id }) {
//   return makeRequest(`posts/${postId}/comments/${id}`, {
//     method: "DELETE",
//   })
// }
