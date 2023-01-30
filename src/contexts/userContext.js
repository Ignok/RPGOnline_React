import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAsync, useAsyncFn } from "../hooks/useAsync";
import useAuth from "../hooks/useAuth";
import { getUser, getFriendship } from "../services/users";

const Context = React.createContext();

export function useUser() {
  return useContext(Context);
}

export function UserProvider({ children }) {
  const { uId } = useParams();

  const { auth } = useAuth();

  //const { loading, error, value: user } = useAsync(() => getUser(uId), [uId]);

  //const { value: friendship } = useAsync(() => getFriendship({uId: auth.uId, targetUId: uId}), [uId])

  const [friendship, setFriendship] = useState();
  const { execute: getFriendshipFn } = useAsyncFn(getFriendship);

  const [user, setUser] = useState();
  const { error, execute: getUserFn } = useAsyncFn(getUser);

  const [ isOwner, setIsOwner ] = useState(false)


  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingFriendship, setLoadingFriendship] = useState(true);

  useEffect(() => {
    setLoadingUser(true)
    getUserFn(uId)
      .then((res) => {
        setUser(res);
        setLoadingUser(false)
      })
  }, [uId])

  useEffect(() => {
    setLoadingFriendship(true)
    getFriendshipFn({ uId: auth.uId, targetUId: uId })
      .then((res) => {
        setFriendship(res)
        setLoadingFriendship(false)
      })
  }, [uId]);

  useEffect(() => {

    if(!loadingUser && !loadingFriendship){
      if(auth.uId == uId){
        setIsOwner(true)
      } else {
        setIsOwner(false)
      }
      setLoading(false)
    }

  }, [loadingUser, loadingFriendship])

  const [avatar, setAvatar] = useState();

  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [aboutMe, setAboutMe] = useState();
  const [attitude, setAttitude] = useState();


  function updateLocalAvatar(avatar) {
    console.log(avatar);
    setAvatar(avatar);
  }

  function updateLocalUser({ country, city, aboutMe, attitude }) {
    setCountry(country);
    setCity(city);
    setAboutMe(aboutMe);
    setAttitude(attitude);
  }

 

  //console.log(user);

  return (
    <Context.Provider
      value={{
        uId: auth.uId,
        user: { uId, ...user },
        friendship: { ...friendship },
        updateLocalUser,
        updateLocalAvatar,
        avatar: avatar,
        country: country,
        city: city,
        aboutMe: aboutMe,
        attitude: attitude,
        isOwner: isOwner
      }}
    >
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1 className="error-msg">{error}</h1>
      ) : (
        children
      )}
    </Context.Provider>
  );
}
