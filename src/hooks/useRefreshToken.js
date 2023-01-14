import { makeRequest } from "../services/makeRequest";
import useAuth from "./useAuth";
import { refreshToken } from "../services/account";

const useRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        const response = await refreshToken();

        setAuth(prev => {
            
            return {
                ...prev,
                uId:  response?.uId,
                username: response?.username,
                role: response?.userRole,
                avatar: response?.avatar
            }
        });
        return response.data;
    }
    return refresh;
};

export default useRefreshToken;