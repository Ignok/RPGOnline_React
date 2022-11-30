import axios from "axios"

const api = axios.create({
    baseURL: "https://localhost:7251/api/",
    withCredentials: true
})

export function makeRequest(url, options) {
    return api(url, options)
    .then(res => res.data)
    .catch(error => Promise.reject(error?.response?.data?.message ?? "Error"))
}