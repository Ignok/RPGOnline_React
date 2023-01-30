import React from "react";
import { Outlet, useParams } from "react-router-dom";
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

import { getImage } from "../helpers/functions/getImage";
import { getFlag } from "../helpers/functions/getFlag";
import { useEffect } from "react";

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
  const {
    uId,
    user,
    updateLocalUser,
    updateLocalAvatar,
    friendship,
    avatar = user.picture,
    country = user.country,
    city = user.city,
    aboutMe = user.aboutMe,
    attitude = user.attitude,
    isOwner
  } = useUser();
  

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
            <Avatar
              alt="Avatar"
              src={getImage(avatar).img}
              variant="rounded"
              sx={{ width: 150, height: 150 }}
            />
            {getFlag(country) === undefined ? (
              ""
            ) : (
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <SmallAvatar
                    alt="country-flag"
                    src={getFlag(country).img}
                  />
                }
                style={{ transform: "translate(-10px, 0px)" }}
              />
            )}
          </Stack>
          <Box sx={{ typography: "subtitle2", mt: 1, mb: 2 }}>{user.email}</Box>
        </Box>

        <ProfileNav isSameUser={isOwner} />
        
      </Sidebar>

      <GridBox sx={{ backgroundColor: "transparent" }}>
        <UserHeading
          username={user.username}
          date={DatetimeToLocaleDateString(user.creationDate)}
        />
        <Outlet context={[user, friendship, updateLocalUser, updateLocalAvatar, country, city, aboutMe, attitude, avatar, isOwner ]}/>
      </GridBox>
    </Grid>
  );
}
