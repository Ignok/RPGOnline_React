import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import EyeIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FanartIcon from "@mui/icons-material/Palette";
import CosplayIcon from "@mui/icons-material/FaceRetouchingNatural";
import HelpIcon from "@mui/icons-material/Help";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import "../../App.css";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function ForumNavbar({option, tagName}) {

  const {auth} = useAuth();

  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  const tags = [
    <Button
      key="fanart"
      startIcon={<FanartIcon />}
      onClick={() => navigate(`tag/fanart`)}
      value="fanart"
      name="fanart"
      id="fanart"
      variant={tagName === "fanart" ? "outlined" : "contained"}
    >
      Fanart
    </Button>,
    <Button
      key="cosplay"
      startIcon={<CosplayIcon />}
      onClick={() => navigate(`tag/cosplay`)}
      value="cosplay"
      name="cosplay"
      id="cosplay"
      variant={tagName === "cosplay" ? "outlined" : "contained"}
    >
      Cosplay
    </Button>,
    <Button
      key="lore"
      startIcon={<HelpIcon />}
      onClick={() => navigate(`tag/lore`)}
      value="lore"
      name="lore"
      id="lore"
      variant={tagName === "lore" ? "outlined" : "contained"}
    >
      Lore
    </Button>,
    <Button
      key="notice"
      startIcon={<FmdBadIcon />}
      onClick={() => navigate(`tag/notice`)}
      value="notice"
      name="notice"
      id="notice"
      variant={tagName === "notice" ? "outlined" : "contained"}
    >
      Notice
    </Button>,
    <Button
      key="help"
      startIcon={<MenuBookIcon />}
      onClick={() => navigate(`tag/help`)}
      value="help"
      name="help"
      id="help"
      variant={tagName === "help" ? "outlined" : "contained"}
    >
      Help
    </Button>,
  ];

  const tagsMenu = (
    <Menu
      elevation={1}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      id="tags-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      sx={{ ml: 1, width: "100%" }}
    >
      <ButtonGroup
        orientation="vertical"
        display="flex"
        sx={{ minWidth: 170 }}
        variant="text"
        color="secondary"
      >
        {tags}
      </ButtonGroup>
    </Menu>
  );

  const nav = [
    <Button
      name="homePage"
      key="home"
      startIcon={<HomeIcon />}
      sx={{ minHeight: 50 }}
      variant={(option === "home" || option === undefined && tagName === undefined) ? "outlined" : "contained"}
      onClick={() => navigate('home')}
    >
      Home
    </Button>,
    <Button
      key="tags"
      startIcon={<TagIcon />}
      sx={{ minHeight: 50 }}
      onClick={handleMenuOpen}
      variant={tagName ? "outlined" : "contained"}
    >
      Tags
    </Button>,
    <Button
      name="followed"
      key="followed"
      startIcon={<EyeIcon />}
      sx={{ minHeight: 50 }}
      variant={option === "followed" ? "outlined" : "contained"}
      onClick={(e) => {
        auth.username ?
        navigate('followed')
        :
        navigate('/login')
      }}
    >
      Followed
    </Button>,
    <Button
      name="favorite"
      key="favorite"
      startIcon={<FavoriteIcon />}
      sx={{ minHeight: 50 }}
      variant={option === "favorite" ? "outlined" : "contained"}
      onClick={(e) => {
        auth.username ?
        navigate('favorite')
        :
        navigate('/login')
      }}
    >
      Favorite
    </Button>,
  ];

  return (
    <Box sx={{ pb: 3, px: 3, width: "100%" }}>
      <ButtonGroup
        variant="contained"
        orientation="vertical"
        display="flex"
        sx={{ minWidth: 165, width: "100%" }}
        color="secondary"
      >
        {nav}
      </ButtonGroup>
      {tagsMenu}
    </Box>
  );
}
