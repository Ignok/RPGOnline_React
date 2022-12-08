import { makeRequest } from "./makeRequest"

export function getUsers({controller}){
  return makeRequest(`Users`, {
    method: "GET",
    //signal: controller.signal
  })
}

export function getUser(uId){
  return makeRequest(`Users/${uId}`, {
    method: "GET",
  })
}



export function editProfile({ uId, country, city, aboutme, attitude }) {
  console.log(uId)
  console.log(country)
  console.log(city)
  console.log(aboutme)
  console.log(attitude)

  return makeRequest(`Users/${uId}/Details`, {
    method: "PUT",
    data: {
      country : country,
      city: city,
      aboutme: aboutme,
      attitude: attitude
     },
  })
}


// FRIENDS
export function getUserFriends(uId){
  return makeRequest(`Users/${uId}/Friends`, {
    method: "GET",
  })
}


// MESSAGES
export function getUserMessages(uId){
  return makeRequest(`Message/${uId}`, {
    method: "GET",
  })
}

export function createMessage({senderId, receiver, title, content}){
  return makeRequest(`Message/${senderId}/send`, {
    method: "POST",
    data: {
      title : title,
      content: content,
      receiverUsername: receiver
     },
  })
}

export function deleteMessage({receiverId, messageId}){
  return makeRequest(`Message/${receiverId}/delete/${messageId}`, {
    method: "DELETE",
  })
}