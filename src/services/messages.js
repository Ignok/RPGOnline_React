import { makeRequest } from "./makeRequest";


export function getUserMessages({uId, page}) {
  return makeRequest(`Message/${uId}`, {
    method: "GET",
    params: { Page: page}
  });
}

export function createMessage({ senderId, receiver, title, content }) {
  return makeRequest(`Message/${senderId}/send`, {
    method: "POST",
    data: {
      title: title,
      content: content,
      receiverUsername: receiver,
    },
  });
}

export function deleteMessage({ receiverId, messageId }) {
  return makeRequest(`Message/${receiverId}/delete/${messageId}`, {
    method: "DELETE",
  });
}

export function closeMessage({uId, messageId}) {
    return makeRequest(`Message/${uId}/close/${messageId}`, {
    method: "PUT"
  });
}

export function openMessage({uId, messageId}) {
    return makeRequest(`Message/${uId}/open/${messageId}`, {
    method: "PUT"
  });
}

export function getNewMessages({uId}){
    return makeRequest(`Message/${uId}/newMessages`, {
        method: "GET"
      });
}