import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAsyncFn } from "../../hooks/useAsync";
import { Success } from "../../helpers/pop-ups/success";
import { logout } from "../../services/account";
import useAuth from "../../hooks/useAuth";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import TranslateIcon from "@mui/icons-material/Translate";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Stack from "@mui/material/Stack";
import { getImage } from "../../helpers/functions/getImage";
import { getNewMessages } from "../../services/messages";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


export default function Navigation() {
  // LOGIN & LOGOUT OPTIONS
  const { execute: logoutFn } = useAsyncFn(logout);
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  const handleLanguageChange = (lng) => {
    localStorage.setItem("language", `${lng}`)
    i18n.changeLanguage(lng);
  }

  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const { execute: getNewMessagesFn } = useAsyncFn(getNewMessages);

  function onNewMessagesGet({ uId }) {
    return getNewMessagesFn({
      uId: uId,
    })
      .then((res) => {
        setNewMessagesCount(res.newMessagesCount ?? 0);
      })
      .catch(() => {
      });
  }

  // getting new messages count every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoggedIn()) {
        onNewMessagesGet({ uId: auth.uId });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [auth]);

  function onLogout() {
    return logoutFn()
      .then((res) => {
        Success.fire({
          icon: "success",
          title: "Logout successfully",
        });
        handleMenuClose();
        setAuth({});
        setNewMessagesCount(0);
        localStorage.removeItem("isLoggedIn");
      })
      .catch(() => {
      });
  }

  function isLoggedIn() {
    if (auth.username) {
      return true;
    } else {
      return false;
    }
  }

  // LOGIN & LOGOUT OPTIONS

  const mainNav = [
    {
      "name": "home",
      "label": t('navigation.home')
    },
    {
      "name": "forum",
      "label": t('navigation.forum')
    },
    {
      "name": "assets",
      "label": t('navigation.assets')
    }
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleMenu1Open = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenu2Open = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleMenu3Open = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleMenu4Open = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
    setAnchorEl3(null);
    setAnchorEl4(null);
  };



  const profileMenu = (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      keepMounted
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      transformOrigin={{ horizontal: "center", vertical: "top" }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 0.5,
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            left: "45%",
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
          },
        },
      }}
    >
      {isLoggedIn() ? (
        <div>
          <MenuItem
            onClick={handleMenuClose}
            component={NavLink}
            to={"/profile/" + auth.uId}
          >
            <ManageAccountsIcon sx={{ mr: 1, color: "text.secondary" }} />
            {t('navigation.profile.name')}
          </MenuItem>
          <MenuItem onClick={() => onLogout()} component={NavLink} to={"/"}>
            <Logout fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
            {t('navigation.profile.logout')}
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem
            onClick={handleMenuClose}
            component={NavLink}
            to={"/login"}
            sx={{ justifyContent: "flex-end" }}
          >
            <LoginIcon sx={{ mr: 1, color: "text.secondary" }} />
            {t('navigation.login')}
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            component={NavLink}
            to={"/register"}
            sx={{ justifyContent: "flex-end" }}
          >
            <VpnKeyIcon sx={{ mr: 1, color: "text.secondary" }} />
            {t('navigation.register')}
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  const communityMenu = (
    <Menu
      anchorEl={anchorEl2}
      id="community-menu"
      keepMounted
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      transformOrigin={{ horizontal: "center", vertical: "top" }}
      open={Boolean(anchorEl2)}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 0.5,
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            left: "45%",
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
          },
        },
      }}
    >
      {isLoggedIn() ? (
        <div>
          <MenuItem
            onClick={handleMenuClose}
            component={NavLink}
            to={"/profile/" + auth.uId}
          >
            {t('navigation.profile.your_profile')}
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={NavLink} to={"/users"}>
            {t('navigation.profile.find_friends')}
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem
            onClick={handleMenuClose}
            component={NavLink}
            to={"/login"}
            sx={{ justifyContent: "flex-end" }}
          >
            <LoginIcon sx={{ mr: 1, color: "text.secondary" }} />
            {t('navigation.login')}
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            component={NavLink}
            to={"/register"}
            sx={{ justifyContent: "flex-end" }}
          >
            <VpnKeyIcon sx={{ mr: 1, color: "text.secondary" }} />
            {t('navigation.register')}
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  const compactMenu = (
    <Menu
      anchorEl={anchorEl3}
      open={Boolean(anchorEl3)}
      onClose={handleMenuClose}
      keepMounted
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      PaperProps={{
        elevation: 1,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 0.5,
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            left: 12,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
          },
        },
      }}
    >
      <MenuItem onClick={handleMenuClose} component={NavLink} to={"/"}>
        {t('navigation.home')}
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={NavLink} to={"/forum/home"}>
        {t('navigation.forum')}
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={NavLink} to={"/assets"}>
        {t('navigation.assets')}
      </MenuItem>
      {isLoggedIn() ? (
        <div>
          <MenuItem
            onClick={handleMenuClose}
            component={NavLink}
            to={"/profile/" + auth.uId}
          >
            {t('navigation.profile.your_profile_caps')}
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={NavLink} to={"/users"}>
            {t('navigation.profile.find_friends_caps')}
          </MenuItem>
        </div>
      ) : (
        ""
      )}
    </Menu>
  );

  const languageMenu = (
    <Menu
      anchorEl={anchorEl4}
      id="account-menu"
      keepMounted
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      transformOrigin={{ horizontal: "center", vertical: "top" }}
      open={Boolean(anchorEl4)}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 0.5,
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            left: "45%",
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
          },
        },
      }}
    >
      <MenuItem onClick={() => {
        handleLanguageChange('pl')
        handleMenuClose();
      }} component={NavLink}>
        Polish
      </MenuItem>
      <MenuItem onClick={() => {
        handleLanguageChange('en')
        handleMenuClose();
      }} component={NavLink}>
        English
      </MenuItem>
    </Menu>
  );



  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          p: 0,
        }}
      >
        <Toolbar
          variant="dense"
          sx={{ backgroundColor: "#bb53f0", p: 0.5, maxHeight: 70 }}
        >
          <Box
            sx={{
              mr: 1,
              ml: { xs: 1, sm: 0 },
              display: { sm: "inline", md: "none" },
            }}
          >
            <IconButton edge="start" color="inherit" onClick={handleMenu3Open}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            NICE DICE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { sm: "flex", md: "none" } }} />
          <Box
            sx={{
              flexGrow: 2,
              mx: "12%",
              justifyContent: "space-around",
              display: { xs: "none", md: "flex" },
            }}
          >
            {mainNav.map((nav) => (
              <Button
                component={NavLink}
                to={"/" + (nav.name === "home" ? "" : nav.name === "forum" ? "forum/home" : nav.name)}
                key={nav.name}
                sx={{
                  color: "white",
                  display: "block",
                  fontWeight: "light",
                  fontSize: "medium",
                }}
              >
                {nav.label}
              </Button>
            ))}
            <Button
              sx={{
                color: "white",
                display: "block",
                fontWeight: "light",
                fontSize: "medium",
              }}
              onClick={handleMenu2Open}
            >
              {t('navigation.community')}
            </Button>
          </Box>
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <IconButton
              size="large"
              aria-label="user account"
              aria-haspopup="true"
              onClick={handleMenu1Open}
              color="inherit"
            >
              {isLoggedIn() ? (
                <Avatar alt={auth.username} src={getImage(auth.avatar).img} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            {auth.uId && (
              <IconButton
                size="large"
                aria-label="mails"
                color="inherit"
                onClick={() => {
                  navigate(`/profile/${auth.uId}/messages`);
                }}
              >
                <Badge badgeContent={newMessagesCount} color="error">
                  <MailIcon sx={{ width: 35 }} />
                </Badge>
              </IconButton>
            )}

            <IconButton onClick={handleMenu4Open} size="large" aria-label="language" color="inherit">
              <TranslateIcon />
            </IconButton>
            {isLoggedIn() ? (
              <IconButton
                onClick={() => onLogout()}
                component={NavLink}
                to={"/"}
                size="large"
                aria-label="logout"
                color="inherit"
              >
                <Logout />
              </IconButton>
            ) : (
              <Box sx={{ display: { sm: "none", md: "none", lg: "flex" } }}>
                <Button
                  component={NavLink}
                  to={"/register"}
                  size="small"
                  sx={{ color: "white" }}
                >
                  {t('navigation.register')}
                </Button>
                <Button
                  component={NavLink}
                  to={"/login"}
                  size="small"
                  sx={{ color: "white" }}
                >
                  {t('navigation.login')}
                </Button>
              </Box>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      {profileMenu}
      {languageMenu}
      {communityMenu}
      {compactMenu}
    </Box>
  );
}
