import { makeRequest } from "./makeRequest"

// export function getPosts() {
//   return makeRequest("/posts")
// }

export function getPost(postId) {
  return makeRequest(`/Posts/${postId}`)
}