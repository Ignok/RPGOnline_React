import React, { Component, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { NavLink } from "react-router-dom";

import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

import CharacterIcon from "@mui/icons-material/PsychologyAlt";
import NPCIcon from "@mui/icons-material/Boy";
import MonsterIcon from "@mui/icons-material/SmartToy";
import RaceIcon from "@mui/icons-material/Diversity1";
import ProfessionIcon from "@mui/icons-material/Diversity3";
import ItemIcon from "@mui/icons-material/LocalMall";
import SpellIcon from "@mui/icons-material/AutoFixNormal";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";

const categories = [
  { label: "character", icon: <CharacterIcon fontSize="small" /> },
  { label: "npc", icon: <NPCIcon fontSize="small" /> },
  { label: "monster", icon: <MonsterIcon fontSize="small" /> },
  { label: "race", icon: <RaceIcon fontSize="small" /> },
  { label: "profession", icon: <ProfessionIcon fontSize="small" /> },
  { label: "item", icon: <ItemIcon fontSize="small" /> },
  { label: "spell", icon: <SpellIcon fontSize="small" /> },
];

export default function MarketNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const createMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      elevation={1}
    >
      {categories.map(({ label, icon }) => {
        return (
          <MenuItem
            key={label}
            // component={NavLink}
            // to={"/create/" + label}
            onClick={handleMenuClose}
            sx={{
              textTransform: label === "npc" ? "uppercase" : "capitalize",
            }}
          >
            <ListItemIcon> {icon} </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        );
      })}
    </Menu>
  );

  const [activeButton, setActiveButton] = useState(null);
  const [params, setParams] = useState({});

  function handleChange(e) {
    setActiveButton(e.target.value);
    e.preventDefault();
    const param = e.target.getAttribute("name");
    const value = e.target.value;
    // setPage(1)
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  }

  const assetsButtons = (
    <ButtonGroup orientation="vertical" variant="text">
      {categories.map(({ label, icon }) => {
        return (
          <Button
            key={label}
            startIcon={activeButton === label ? <ArrowRightIcon /> : icon}
            value={label}
            name={label}
            id={label}
            sx={{ minHeight: 45 }}
            onClick={handleChange}
            color={activeButton === label ? "secondary" : "primary"}
          >
            {label}
          </Button>
        );
      })}
    </ButtonGroup>
  );

  return (
    <Box
      sx={{
        pt: { xs: 0, md: 15 },
        pr: { xs: 0, md: 10 },
        pb: 5,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: "text.secondary", textAlign: "center" }}
      >
        Browse assets!
      </Typography>
      {assetsButtons}

      <Box
        sx={{
          px: { xs: 10, md: 1 },
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ color: "text.secondary", mt: 2 }}
        >
          Or..
        </Typography>
        <Button
          variant="contained"
          endIcon={<AutoAwesomeIcon />}
          onClick={handleMenuOpen}
          sx={{ minHeight: 45, borderRadius: 10 }}
        >
          Create new!
        </Button>
        {createMenu}
      </Box>
    </Box>
  );
}