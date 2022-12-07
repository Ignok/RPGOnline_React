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

export function getUserFriends(uId){
  return makeRequest(`Users/${uId}/Friends`, {
    method: "GET",
  })
}

export function getUserMessages(uId){
  return makeRequest(`Users/${uId}/Messages`, {
    method: "GET",
  })
}

export function createMessage({senderId, receiver, title, content}){
  console.log(senderId)
  console.log(receiver)
  console.log(title)
  console.log(content)
  return makeRequest(`Users/${senderId}/Messages`, {
    method: "POST",
    data: {
      title : title,
      content: content,
      receiverUsername: receiver
     },
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