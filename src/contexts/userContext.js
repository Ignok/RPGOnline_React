import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { editProfile, getUser } from "../services/users";

const Context = React.createContext();

export function useUser() {
  return useContext(Context);
}

export function UserProvider({ children }) {
  const { uId } = useParams();
  const { loading, error, value: user } = useAsync(() => getUser(uId), [uId]);

  const [avatar, setAvatar] = useState();

  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [aboutMe, setAboutMe] = useState();
  const [attitude, setAttitude] = useState();


  function updateLocalAvatar(avatar) {
    console.log(avatar);
    setAvatar(avatar);
  }

  function updateLocalUser({country, city, aboutMe, attitude}){
    setCountry(country);
    setCity(city);
    setAboutMe(aboutMe);
    setAttitude(attitude);
  }


  //console.log(user);

  return (
    <Context.Provider
      value={{
        user: { uId, ...user },
        updateLocalUser,
        updateLocalAvatar,
        avatar: avatar,
        country: country,
        city: city,
        aboutMe: aboutMe,
        attitude: attitude,
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
