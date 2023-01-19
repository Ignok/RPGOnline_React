import UserProfile from ".";
import Icon from "../icons";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useNavigate  } from "react-router-dom";

import { styled } from "@mui/material/styles";
import "../../App.css";


export default function ProfileNav() {
  const navigate = useNavigate();

  return (
    <Stack>
      <UserProfile.ButtonNav className="navigation-button" onClick={() => navigate('aboutme')} type="button" >
        <Icon className="fa-solid fa-user"/>
        About me
      </UserProfile.ButtonNav>
      <UserProfile.ButtonNav className="navigation-button" onClick={() => navigate('friends')} type="button" >
        <Icon className="fa-solid fa-users" />
        Friends
      </UserProfile.ButtonNav>
      <UserProfile.ButtonNav className="navigation-button" href="#">
        <Icon className="fa-solid fa-trophy" />
        Achievements
      </UserProfile.ButtonNav>
      <UserProfile.ButtonNav className="navigation-button" href="#">
        <Icon className="fa-solid fa-chart-simple" />
        Statistics
      </UserProfile.ButtonNav>
      <UserProfile.ButtonNav className="navigation-button" onClick={() => navigate('messages')} type="button" >
        <Icon className="fa-solid fa-envelope" />
        Messages
      </UserProfile.ButtonNav>
      <UserProfile.ButtonNav className="navigation-button" href="#">
        <Icon className="fa-solid fa-bookmark" />
        Saved
      </UserProfile.ButtonNav>
      <UserProfile.ButtonNav className="navigation-button" href="#">
        <Icon className="fa-solid fa-gear" />
        Settings
      </UserProfile.ButtonNav>
    </Stack>
  );
}
