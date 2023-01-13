import { useContext, useDebugValue } from "react";
import AuthContext from "../contexts/AuthProvider";


const useAuth = () => {

    // const user = localStorage.getItem("user");
    // console.log(user)
    return useContext(AuthContext);
}

export default useAuth;