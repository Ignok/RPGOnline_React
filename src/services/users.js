import { makeRequest } from "./makeRequest";

export function getUsers() {
  return makeRequest(`Users`, {
    method: "GET",
  });
}

export function getUser(uId) {
  return makeRequest(`Users/${uId}`, {
    method: "GET",
    withCredentials: true,
  });
}

export function editProfile({ uId, country, city, aboutMe, attitude }) {
  return makeRequest(`Users/${uId}/Details`, {
    method: "PUT",
    data: {
      country: country,
      city: city,
      aboutMe: aboutMe,
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
  return makeRequest(`Friendship/${uId}`, {
    method: "GET",
  });
}

export function manageFriendship({uId, targetUId, option}) {
  return makeRequest(`Friendship/Manage`, {
    method: "POST",
    data: {
      uId: uId,
      targetUId: targetUId,
      option: option
    },
  });
}

export function getFriendship({uId, targetUId}) {
  return makeRequest(`Friendship/${uId}/${targetUId}`, {
    method: "GET",
  });
}

export function rateFriend({uId, targetUId, rating}) {
  return makeRequest(`Friendship/Rate`, {
    method: "POST",
    data: {
      uId: uId,
      targetUId: targetUId,
      rating: rating
    },
  });
}