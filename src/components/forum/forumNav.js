import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import EyeIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";

import FanartIcon from "@mui/icons-material/Palette";
import CosplayIcon from "@mui/icons-material/FaceRetouchingNatural";
import NoviceLoreHelpIcon from "@mui/icons-material/PsychologyAltOutlined";
import CharacterIcon from "@mui/icons-material/PsychologyAlt";
import NPCIcon from "@mui/icons-material/Boy";
import MonsterIcon from "@mui/icons-material/SmartToy";
import RaceIcon from "@mui/icons-material/Diversity1";
import ProfessionIcon from "@mui/icons-material/Diversity3";
import ItemIcon from "@mui/icons-material/LocalMall";
import SpellIcon from "@mui/icons-material/AutoFixNormal";
import HelpIcon from "@mui/icons-material/Help";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import { styled } from "@mui/system";
import "../../App.css";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function ForumNavbar({ params, onTagChange, onPageOptionChange }) {

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
      onClick={onTagChange}
      value="fanart"
      name="fanart"
      id="fanart"
    >
      Fanart
    </Button>,
    <Button
      key="cosplay"
      startIcon={<CosplayIcon />}
      onClick={onTagChange}
      value="cosplay"
      name="cosplay"
      id="cosplay"
    >
      Cosplay
    </Button>,
    <Button
      key="lore"
      startIcon={<HelpIcon />}
      onClick={onTagChange}
      value="lore"
      name="lore"
      id="lore"
    >
      Lore
    </Button>,
    <Button
      key="notice"
      startIcon={<FmdBadIcon />}
      onClick={onTagChange}
      value="notice"
      name="notice"
      id="notice"
    >
      Notice
    </Button>,
    <Button
      key="help"
      startIcon={<MenuBookIcon />}
      onClick={onTagChange}
      value="help"
      name="help"
      id="help"
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
      onClick={onPageOptionChange}
    >
      Home
    </Button>,
    <Button
      key="tags"
      startIcon={<TagIcon />}
      sx={{ minHeight: 50 }}
      onClick={handleMenuOpen}
    >
      Tags
    </Button>,
    <Button
      name="followed"
      key="followed"
      startIcon={<EyeIcon />}
      sx={{ minHeight: 50 }}
      onClick={(e) => {
        auth.username ?
        onPageOptionChange(e)
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
      onClick={(e) => {
        auth.username ?
        onPageOptionChange(e)
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
