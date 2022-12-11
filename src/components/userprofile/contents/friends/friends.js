import { useEffect, useState } from "react";
import { useUser } from "../../../../contexts/userContext";
import { getUserFriends } from "../../../../services/users";
import { useAsyncFn } from "../../../../hooks/useAsync";
import FriendItem from "./friendItem";
import List from "@mui/material/List";
import { Box } from "@mui/material";
import { styled, Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button, { ButtonProps } from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const ColorButton = styled(Button)(() => ({
  color: "white",
  "&:hover": {
    color: "#f37653",
    backgroundColor: "transparent",
  },
}));

export default function FriendsContents({ uId }) {
  const [contents, setContents] = useState("friends");
  const handleContentsChange = (pageName) => {
    setContents(pageName);
  };

  const [friends, setFriends] = useState();
  // const {user, page = 'friends', changePage} = useUser();

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

  // function switchPage(page) {
  //   console.log(page)
  //   switch(page) {
  //     case 'blocked':
  //       return <FriendsContents />;
  //     case 'friends':
  //       return <FriendsContents uId={user.uId} />;
  //     default:
  //       return 'something is wrong';
  //   }
  // }

  return (
    <Box>
      <Box
        position="static"
        sx={{
          bgcolor: "var(--accent)",
          boxShadow: 1,
          padding: 1.5,
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          sx={{ bgColor: "#da57b3", mx: 2 }}
        >
          <Typography
            variant="h6"
            align="center"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "none", md: "inline" },
              color: "white",
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            FRIENDS
          </Typography>
          {/* dodac FRIEND LIST kiedy sie jest w widoku requests/blocked */}
          <ColorButton
            onClick={() => handleContentsChange("requests")}
            sx={{
              color: contents === "requests" ? "var(--accent-light)" : "white",
            }}
          >
            FRIEND REQUESTS
          </ColorButton>
          <Divider orientation="vertical" color="white" flexItem />
          <ColorButton
            onClick={() => handleContentsChange("friends")}
            sx={{
              color: contents === "friends" ? "var(--accent-light)" : "white",
            }}
          >
            FRIENDS LIST
          </ColorButton>
          <Divider orientation="vertical" color="white" flexItem />
          <ColorButton
            onClick={() => handleContentsChange("blocked")}
            sx={{
              color: contents === "blocked" ? "var(--accent-light)" : "white",
            }}
          >
            BLOCKED
          </ColorButton>
        </Stack>
      </Box>
      {loading ?
      <h1>Loading . . .</h1>
      :
      (friends?.length ? (
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
                senderId={uId}
                username={friend.username}
                country={friend.country}
                attitude={friend.attitude}
                picture={friend.picture}
                contents={contents}
              />
            );
          })}
        </List>
      ) : (
        <h4>No friends to display</h4>
      ))}
    </Box>
  );
}
