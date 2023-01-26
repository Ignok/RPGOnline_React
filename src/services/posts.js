import { makeRequest } from "./makeRequest"

// export function getPosts() {
//   return makeRequest("/posts")
// }

export function getPost(postId) {
  return makeRequest(`/Posts/${postId}`,{
    method: "GET",
    withCredentials: true
  })
}

export function createPost({ uId, title, content, postId, tag }) {
  console.log(uId)
  console.log(title)
  console.log(content)
  console.log(postId)
  console.log(tag)

  return makeRequest(`/Posts`, {
    method: "POST",
    withCredentials: true,
    data: {
      uId : uId,
      title : title,
      content : content,
      tag: tag
     },
  })
}