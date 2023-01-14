import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, isLoggedIn } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.log(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.username && isLoggedIn ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    useEffect(() => {
        // console.log(`isLoading: ${isLoading}`)
        // console.log(`username: ${JSON.stringify(auth?.username)}`)
    }, [isLoading])

    return (
        <>
            {!isLoggedIn
                ? <Outlet />
                : isLoading
                    ? <h1>Loading...</h1>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin