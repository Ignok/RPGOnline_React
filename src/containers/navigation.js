import React, { Component, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useAsyncFn } from "../hooks/useAsync";
import { Success } from "../helpers/pop-ups/success";
import { logout } from "../services/account";
import { ROLES } from "../helpers/enums/roles";
import useAuth from "../hooks/useAuth";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import TranslateIcon from "@mui/icons-material/Translate";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import Slide from "@mui/material/Slide";
import { TransitionGroup } from "react-transition-group";

export default function Navigation() {
  // LOGIN & LOGOUT OPTIONS
  const { loading, error, execute: logoutFn } = useAsyncFn(logout);
  const { auth, setAuth } = useAuth();

  function onLogout() {
    return logoutFn()
      .then((res) => {
        handleMenuClose();
        console.log(res);
        Success.fire({
          icon: "success",
          title: "Logout successfully",
        });
        setAuth({});
        localStorage.removeItem("isLoggedIn");
      })
      .catch((error) => {
        console.log(error);
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

  const mainNav = ["home", "forum", "assets", "secret"];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  //   const isMenuOpen = Boolean(anchorEl);

  const handleMenu1Open = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenu2Open = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
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
            to={"/aboutme/" + auth.uId}
          >
            <ManageAccountsIcon sx={{ mr: 1, color: "text.secondary" }} />
            Profile
          </MenuItem>
          <MenuItem onClick={() => onLogout()} component={NavLink} to={"/"}>
            <Logout fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
            Logout
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
            Login
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            component={NavLink}
            to={"/register"}
            sx={{ justifyContent: "flex-end" }}
          >
            <VpnKeyIcon sx={{ mr: 1, color: "text.secondary" }} />
            Register
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
            to={"/aboutme/" + auth.uId}
          >
            Your Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={NavLink} to={"/users"}>
            Find Friends
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
            Login
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            component={NavLink}
            to={"/register"}
            sx={{ justifyContent: "flex-end" }}
          >
            <VpnKeyIcon sx={{ mr: 1, color: "text.secondary" }} />
            Register
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            NICE DICE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { sm: "flex", md: "none" } }} />
          <Box
            sx={{
              flexGrow: 1,
              mx: "15%",
              justifyContent: "space-around",
              display: { xs: "none", md: "flex" },
            }}
          >
            {mainNav.map((nav) => (
              <Button
                component={NavLink}
                to={"/" + (nav === "home" ? "" : nav)}
                key={nav}
                sx={{
                  color: "white",
                  display: "block",
                  fontWeight: "light",
                  fontSize: "medium",
                }}
              >
                {nav}
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
              Community
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
              <AccountCircle />
            </IconButton>
            <IconButton size="large" aria-label="mails" color="inherit">
              <Badge badgeContent={1} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="language" color="inherit">
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
              <Box sx={{ display: { md: "none", lg: "flex" } }}>
                <Button
                  component={NavLink}
                  to={"/register"}
                  size="small"
                  sx={{ color: "white" }}
                >
                  Register
                </Button>
                <Button
                  component={NavLink}
                  to={"/login"}
                  size="small"
                  sx={{ color: "white" }}
                >
                  Login
                </Button>
              </Box>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      {profileMenu}
      {communityMenu}
    </Box>
  );
}
