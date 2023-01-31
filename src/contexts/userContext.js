import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAsync, useAsyncFn } from "../hooks/useAsync";
import useAuth from "../hooks/useAuth";
import { getUser, getFriendship } from "../services/users";
import Swal from "sweetalert2";

const Context = React.createContext();

export function useUser() {
  return useContext(Context);
}

export function UserProvider({ children }) {
  const { uId } = useParams();

  const { auth } = useAuth();

  const navigate = useNavigate();


  const [user, setUser] = useState();
  const { error, execute: getUserFn } = useAsyncFn(getUser);

  const [isOwner, setIsOwner] = useState(false)

  const [friendship, setFriendship] = useState();

  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    setFetching(true)
    getUserFn(uId)
      .then((res) => {
        console.log(res)
        setIsOwner(auth.uId == uId)
        setUser(res);
        setFriendship(res.friendshipStatus)
        setFetching(false)
      })
      .catch((err) => {
        err.response?.data === "Blocked"
          &&
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `It seems like this user has blocked you ¯\\_(ツ)_/¯`
          })
        navigate("/Users")
      })
  }, [uId])


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
      {fetching ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1 className="error-msg">{error}</h1>
      ) : (
        children
      )}
    </Context.Provider>
  );
}
