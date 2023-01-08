import axios from "axios"
import { useNavigate } from "react-router-dom";


const api = axios.create({
    baseURL: "https://localhost:7251/api/",
    withCredentials: true
})

export function makeRequest(url, options) {

    return api(url, options)
    .then(res => res.data)
    .catch(error => {
        console.log(error)
        if(error.response?.status === 401){
            console.log("Unauthorized")
            //localStorage.clear()
            window.location.href = "/login";
        }
        else
        {
            Promise.reject(error?.response ?? "Error")
        }
    })
}