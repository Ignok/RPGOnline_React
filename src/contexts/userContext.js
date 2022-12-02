import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { editProfile, getUser } from "../services/users";

const Context = React.createContext();

export function useUser() {
    console.log("useUser");
  return useContext(Context);
}

export function UserProvider({ children }) {
  const { uId } = useParams();
  const { loading, error, value: user } = useAsync(() => getUser(uId), [uId]);

  //   useEffect(() => {
  //     if (post?.comments == null) return
  //     setComments(post.comments)
  //   }, [post?.comments])

  //   function updateLocalUser(comment) {
  //     setComments(prevComments => {
  //       return [comment, ...prevComments]
  //     })
  //   }

  console.log(user);

  return (
    <Context.Provider
      value={{
        user: { uId, ...user },
        // updateLocalUser
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
