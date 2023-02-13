import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ProfileNav from "../components/userprofile/profileNav";
import { DateToLocaleDateString } from "../helpers/functions/DateTimeConverter";
import Box from "@mui/material/Box";
import { Stack, Rating, Button } from "@mui/material";
import UserHeading from "../components/userprofile/userHeading";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import "../App.css";
import { useAsyncFn } from "../hooks/useAsync";
import { rateFriend } from "../services/users";
import { useUser } from "../contexts/userContext";
import { Success } from "../helpers/pop-ups/success";
import { getImage } from "../helpers/functions/getImage";
import { getFlag } from "../helpers/functions/getFlag";

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

  const [ ratingPrecision, setRatingPrecision ] = useState(0.1);
  const [ disableRating, setDisableRating ] = useState(true);

  const [ displayedRatingValue, setDisplayedRatingValue ] = useState(friendship.averageRating)
  const [ myRatingValue, setMyRatingValue ] = useState(friendship.myRating);

  const {loading, error, execute: rateFriendFn } = useAsyncFn(rateFriend)

  function handleRate(e, value){
    e.preventDefault();

    if(value){
      return rateFriendFn({
        uId: uId,
        targetUId: user.uId,
        rating: value
      }).then((res) => {
        setMyRatingValue(value);
        setRatingPrecision(0.1);
        setDisableRating(true);
        setDisplayedRatingValue(friendship.averageRating);
        Success.fire({
          icon: "success",
          title: `Successfully rated ${value}`,
        })
      }).catch((err) => {
        setMyRatingValue(0);
        setRatingPrecision(0.1);
        setDisableRating(true);
        setDisplayedRatingValue(friendship.averageRating);
  
        if(err.response?.status === 400){
          const errMessage = err.response?.data;
          Success.fire({
            icon: "error",
            title: errMessage,
          })
        }
      })
    } else {
      Success.fire({
        icon: "error",
        title: "Cannot give the same rating",
      })
    }
  }

  function handleRatingChange(e){
    e.preventDefault();

    const eventName = e.target.name;

    if(eventName === "allow rating") {
      setRatingPrecision(1);
      setDisableRating(false);
      setDisplayedRatingValue(myRatingValue);
    } else if(eventName === "cancel rating") {
      setRatingPrecision(0.1);
      setDisableRating(true);
      setDisplayedRatingValue(friendship.averageRating);
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
          {isOwner &&
            <Box sx={{ typography: "subtitle2", mt: 1, mb: 0 }}>
              {user.email}
            </Box>
          }

          <Stack  sx={{
                typography: "subtitle2",
                mt: 1,
                mb: 2,
                textAlign: "center"
                
              }}>
            <Rating
              size="large"
              precision={ratingPrecision}
              value={displayedRatingValue}
              disabled={ loading || disableRating}
              onChange={handleRate}
            />
            {friendship.isFriend &&
            <Button
              name={disableRating ? "allow rating" : "cancel rating"}
              size="small"
              color={disableRating ? "primary" : "error"}
              onClick={handleRatingChange}
            >
              {disableRating ? "Rate your friend!" : "Cancel"}
            </Button>
            }
            
          </Stack>

        </Box>

        <ProfileNav isSameUser={isOwner} />

      </Sidebar>

      <GridBox sx={{ backgroundColor: "transparent" }}>
        <UserHeading
          username={user.username}
          date={DateToLocaleDateString(user.creationDate)}
        />
        <Outlet context={[user, isOwner, friendship, updateLocalUser, updateLocalAvatar, country, city, aboutMe, attitude, avatar]} />
      </GridBox>
    </Grid>
  );
}
