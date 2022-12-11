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
  const [page, setPage] = useState();
  const [avatar, setAvatar] = useState();

  //   useEffect(() => {
  //     if (post?.comments == null) return
  //     setComments(post.comments)
  //   }, [post?.comments])

  function updateLocalAvatar(avatar) {
    console.log(avatar);
    setAvatar(avatar);
  }

  // function getUserFriends(uId) {
  //   return commentsByParentId[responseCommentId]
  // }

  function changePage(pageName) {
    setPage(pageName);
  }

  console.log(user);

  return (
    <Context.Provider
      value={{
        user: { uId, ...user },
        page: page,
        changePage,
        updateLocalAvatar,
        avatar: avatar,
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
