import axios from "axios"
import { refreshToken } from "./account";


export const api = axios.create({
    baseURL: "https://localhost:7251/api/",
    withCredentials: true
})

export async function makeRequest(url, options) {

    return api(url, options)
    .then(res => res.data)
    .catch( async error => {
        if(error.response?.status === 401){
            console.log("Unauthorized")
            await refreshToken();
            return api(url, options)
                .then(res => res.data)
                .catch( async error => {
                    localStorage.removeItem("isLoggedIn");
                    Promise.reject(error?.response ?? "Error")
                })
        }
        else if(error.response?.status === 400){
            throw error;
        }
        else if(error.response?.status === 403){
            console.log("Incorrect role")
            throw error;
        }
        else
        {
            Promise.reject(error ?? "Error")
        }
    })
}