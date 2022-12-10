import { makeRequest } from "./makeRequest";

export function getUsers({ controller }) {
  return makeRequest(`Users`, {
    method: "GET",
    //signal: controller.signal
  });
}

export function getUser(uId) {
  return makeRequest(`Users/${uId}`, {
    method: "GET",
  });
}

export function editProfile({ uId, country, city, aboutme, attitude }) {
  return makeRequest(`Users/${uId}/Details`, {
    method: "PUT",
    data: {
      country: country,
      city: city,
      aboutMe: aboutme,
      attitude: attitude,
    },
  });
}

export function editAvatar({ uId, picture }) {
  return makeRequest(`Users/${uId}/Avatar`, {
    method: "PUT",
    data: {
      picture: picture
    },
  });
}

// FRIENDS
export function getUserFriends(uId) {
  return makeRequest(`Users/${uId}/Friends`, {
    method: "GET",
  });
}

// MESSAGES
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
