import { makeRequest } from "./makeRequest"

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