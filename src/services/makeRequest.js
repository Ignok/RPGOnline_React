import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Fail } from "../helpers/pop-ups/failed";


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
            throw error;
            //window.location.href = "/login";
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
            Promise.reject(error?.response ?? "Error")
        }
    })
}