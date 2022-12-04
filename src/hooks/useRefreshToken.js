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
            console.log(response.data.accessToken)
            return {...prev, accessToken: response.data.accessToken}
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;