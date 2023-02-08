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

export function createFanart({ uId, title, content, tag, picture }) {
  console.log(uId)
  console.log(title)
  console.log(content)
  console.log(tag)
  console.log(picture)

  return makeRequest(`/Posts`, {
    method: "POST",
    withCredentials: true,
    data: {
      uId : uId,
      title : title,
      content : content,
      tag: tag,
      picture: picture
     },
  })
}

export function createPost({ uId, title, content, tag }) {
  console.log(uId)
  console.log(title)
  console.log(content)
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

export function likePost({
  uId,
  postId
}) {
  return makeRequest(`Users/${uId}/Posts/${postId}`, {
    method: "POST",
    withCredentials: true,
  });
}

export function unlikePost({
  uId,
  postId
}) {
  return makeRequest(`Users/${uId}/Posts/${postId}`, {
    method: "DELETE",
    withCredentials: true,
  });
}