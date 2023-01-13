import { makeRequest } from "../services/makeRequest";
import useAuth from "./useAuth";
import { refreshToken } from "../services/account";

const useRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        const response = await refreshToken();

        setAuth(prev => {
            console.log(prev)
            console.log(response)
            return {...prev}
        });
        return response.data;
    }
    return refresh;
};

export default useRefreshToken;