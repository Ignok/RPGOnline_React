import { makeRequest } from "./makeRequest"

export function login({ username, pswd }) {
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
    return makeRequest(`Account/logout`, {
        method: "POST",
        withCredentials: true
    })
}