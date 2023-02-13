import { makeRequest } from "./makeRequest"


export function getPost(postId) {
  return makeRequest(`/Posts/${postId}`,{
    method: "GET",
    withCredentials: true
  })
}

export function createFanart({ uId, title, content, tag, picture }) {
  console.log(tag)
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

export function deletePost({ postId }) {
  return makeRequest(`Posts/delete/${postId}`, {
    method: "DELETE",
    withCredentials: true,
  })
}