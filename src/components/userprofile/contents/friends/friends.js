import { useEffect, useState } from "react";
import { useUser } from "../../../../contexts/userContext";
import { getUserFriends } from "../../../../services/users";
import { useAsyncFn } from "../../../../hooks/useAsync";
import FriendsMenu from "./menu";
import FriendItem from "./friendItem";
import List from "@mui/material/List";
import { Box } from "@mui/material";

export default function FriendsContents({ uId }) {
  const [friends, setFriends] = useState();

  const {
    loading,
    error,
    execute: getUserFriendsFn,
  } = useAsyncFn(getUserFriends);
  // refreshList(){
  //     getUsers()
  //     .then(response=>response.json())
  //     .then(data=>{
  //         this.setState({users:data});
  //         console.log(data);
  //     });
  // }

  // componentDidMount(){
  //     this.refreshList();
  // }

  useEffect(() => {
    let isMounted = true;
    //const controller = new AbortController();

    getUserFriendsFn(uId).then((data) => {
      console.log(data);
      isMounted && setFriends(data);
    });

    return () => {
      isMounted = false;
      //controller.abort();
    };
  }, []);

  return (
    <Box>
      <FriendsMenu />
      {friends?.length ? (
        <List
          sx={{
            border: 1,
            borderRadius: 0,
            borderColor: "var(--accent)",
            backgroundColor: "var(--accent-opaque)",
            my: 2,
            display: "flex",
            flexDirection: "column",
            py: 3,
            px: 10,
          }}
        >
          {friends.map((friend) => {
            return (
              <FriendItem
                username={friend.username}
                country="PL" //tymczasowo
                picture={friend.picture}
              />
            );
          })}
        </List>
      ) : (
        <h1>No friends to display</h1>
      )}
    </Box>
  );
}
