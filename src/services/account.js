import { makeRequest } from "./makeRequest"

export function login({ username, pswd }) {
    console.log(username)
    console.log(pswd)

    return makeRequest(`Account/login`, {
        method: "POST",
        withCredentials: true,
        data: {
            username: username,
            pswd: pswd
        },
    })
}

export function register({ username, pswd, email }) {
    console.log(username)
    console.log(pswd)
    console.log(email)

    return makeRequest(`Account/register`, {
        method: "POST",
        data: {
            username: username,
            pswd: pswd,
            email: email
        },
    })
}

export function refreshToken() {

    return makeRequest(`Account/refresh`,  {
        method: "POST",
        withCredentials: true
    })
}

export function logout(){
    console.log("Logging out...")

    return makeRequest(`Account/logout`, {
        method: "POST",
        withCredentials: true
    })
}