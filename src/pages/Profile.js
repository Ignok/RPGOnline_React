import React from "react";
import { useParams } from "react-router-dom";
import ProfileNav from "../components/userprofile/profileNav";
import { getUsersAbout } from "../Api_RPGOnline";
import { DatetimeToLocaleDateString } from "../helpers/functions/DateTimeConverter";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import UserHeading from "../components/userprofile/userHeading";
import AboutMeContents from "../components/userprofile/contents/aboutme/aboutMe";

import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";

import "../App.css";
import { useAsyncFn } from "../hooks/useAsync";
import { editProfile } from "../services/users";
import { useUser } from "../contexts/userContext";
import FriendsContents from "../components/userprofile/contents/friends/friends";
import MessagesContents from "../components/userprofile/contents/messages/messages";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 50,
  height: 50,
}));

const GridBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
  },
  [theme.breakpoints.up("md")]: {
    gridColumn: 2,
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    maxWidth: 300,
  },
}));

export function Profile() {
  const { user, page = "aboutme", changePage } = useUser();
  const { loading, error } = useAsyncFn();

  // function onUserEdit(country, city, aboutme, attitude){
  //   return editProfileFn({uId: user.uId, country, city, aboutme, attitude})
  //     .then(updateLocalUser)
  // }

  // function refreshPage() {
  //   getUsersAbout(this.state.uId)
  //     .then((response) => response.json())
  //     .then(
  //       (data) => {
  //         this.setState({
  //           user: data,
  //           isLoaded: true,
  //         });
  //       },
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error,
  //         });
  //       }
  //     );
  // }

  // function componentDidMount() {
  //   this.refreshPage();
  // }

  const onPageChange = (pageName) => {
    console.log(pageName);
    changePage(pageName);
  };

  function switchPage(page) {
    console.log(page);
    switch (page) {
      case "aboutme":
        return (
          <AboutMeContents
            uId={user.uId}
            country={user.country}
            city={user.city}
            attitude={user.attitude}
            aboutme={user.aboutMe}
          />
        );
      case "friends":
        return <FriendsContents uId={user.uId} />;
      case "messages":
        return <MessagesContents uId={user.uId} />;
      default:
        return "something is wrong";
    }
  }

  return (
    <Grid
      container
      display="grid"
      sx={{
        gap: 1,
        padding: 1,
        gridTemplateColumns: "auto",
        gridTemplateRows: "auto",
        background: "transparent",
        overflow: "hidden",
        mb: 5,
        //   gridTemplateAreas: `"sidebar main"`
      }}
    >
      <Sidebar gridColumn={1} sx={{ minWidth: 175 }}>
        <Box
          display="flex"
          sx={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack direction="row">
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <SmallAvatar
                  alt="PL"
                  src={require("../helpers/pictures/poland_flag.png")}
                />
              }
            >
              <Avatar
                alt="Avatar"
                src={require("../helpers/pictures/anonymous_user.png")}
                variant="rounded"
                sx={{ width: 150, height: 150 }}
              />
            </Badge>
          </Stack>
          <Box sx={{ typography: "subtitle2", mt: 1, mb: 2 }}>{user.email}</Box>
        </Box>
        <ProfileNav onPageChange={onPageChange} />
      </Sidebar>

      <GridBox sx={{ backgroundColor: "transparent" }}>
        <UserHeading
          username={user.username}
          date={DatetimeToLocaleDateString(user.creationDate)}
        />
        {switchPage(page)}
      </GridBox>
    </Grid>
  );
}
