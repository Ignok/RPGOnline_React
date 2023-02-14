import UserProfile from ".";
import Icon from "../icons";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../App.css";


export default function ProfileNav({
  isSameUser
}) {
  const navigate = useNavigate();
  
  const { t } = useTranslation();

  return (
    <Stack>
      <UserProfile.ButtonNav className="navigation-button" onClick={() => navigate('about')} type="button" >
        <Icon className="fa-solid fa-user" />
        {t('profile.about')}
      </UserProfile.ButtonNav>
      <UserProfile.ButtonNav className="navigation-button" onClick={() => navigate('friends')} type="button" >
        <Icon className="fa-solid fa-users" />
        {t('profile.friends')}
      </UserProfile.ButtonNav>
      <UserProfile.ButtonNav className="navigation-button" onClick={() => navigate('achievements')} type="button">
        <Icon className="fa-solid fa-trophy" />
        {t('profile.achievements')}
      </UserProfile.ButtonNav>
      {isSameUser &&
        <>
          <UserProfile.ButtonNav className="navigation-button" onClick={() => navigate('statistics')} type="button">
            <Icon className="fa-solid fa-chart-simple" />
            {t('profile.statistics')}
          </UserProfile.ButtonNav>
          <UserProfile.ButtonNav className="navigation-button" onClick={() => navigate('messages')} type="button" >
            <Icon className="fa-solid fa-envelope" />
            {t('profile.messages')}
          </UserProfile.ButtonNav>
          <UserProfile.ButtonNav className="navigation-button" onClick={() => navigate('/forum/favorite')} type="button">
            <Icon className="fa-solid fa-bookmark" />
            {t('profile.saved')}
          </UserProfile.ButtonNav>
          <UserProfile.ButtonNav className="navigation-button" onClick={() => navigate('settings')} type="button">
            <Icon className="fa-solid fa-gear" />
            {t('profile.settings')}
          </UserProfile.ButtonNav>
        </>
      }
    </Stack>
  );
}
