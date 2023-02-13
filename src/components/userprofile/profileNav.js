import UserProfile from ".";
import Icon from "../icons";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";

import "../../App.css";


export default function ProfileNav({
  isSameUser
}) {
  const navigate = useNavigate();

  return (
    <Stack>
      <UserProfile.ButtonNav className="navigation-button" onClick={() => navigate('about')} type="button" >
        <Icon className="fa-solid fa-user" />
        About
      </UserProfile.ButtonNav>
      <UserProfile.ButtonNav className="navigation-button" onClick={() => navigate('friends')} type="button" >
        <Icon className="fa-solid fa-users" />
        Friends
      </UserProfile.ButtonNav>
      <UserProfile.ButtonNav className="navigation-button" onClick={() => navigate('achievements')} type="button">
        <Icon className="fa-solid fa-trophy" />
        Achievements
      </UserProfile.ButtonNav>
      {isSameUser &&
        <>
          <UserProfile.ButtonNav className="navigation-button" onClick={() => navigate('statistics')} type="button">
            <Icon className="fa-solid fa-chart-simple" />
            Statistics
          </UserProfile.ButtonNav>
          <UserProfile.ButtonNav className="navigation-button" onClick={() => navigate('messages')} type="button" >
            <Icon className="fa-solid fa-envelope" />
            Messages
          </UserProfile.ButtonNav>
          <UserProfile.ButtonNav className="navigation-button" onClick={() => navigate('/forum/favorite')} type="button">
            <Icon className="fa-solid fa-bookmark" />
            Saved
          </UserProfile.ButtonNav>
          <UserProfile.ButtonNav className="navigation-button" onClick={() => navigate('settings')} type="button">
            <Icon className="fa-solid fa-gear" />
            Settings
          </UserProfile.ButtonNav>
        </>
      }

    </Stack>
  );
}
