import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useNavigate } from "react-router-dom";
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

const categories = [
  { url:"character/playable", label: "playable", icon: <CharacterIcon fontSize="small" name={"playable"} />, },
  { url:"character/npc", label: "npc", icon: <NPCIcon fontSize="small" name={"npc"} /> },
  { url:"character/monster", label: "monster", icon: <MonsterIcon fontSize="small" name={"monster"} /> },
  { url:"race", label: "race", icon: <RaceIcon fontSize="small" name={"race"} /> },
  { url:"profession", label: "profession", icon: <ProfessionIcon fontSize="small" name={"profession"} />, },
  { url:"item", label: "item", icon: <ItemIcon fontSize="small" name={"item"} /> },
  { url:"spell", label: "spell", icon: <SpellIcon fontSize="small" name={"spell"} /> },
];

export default function MarketNavbar({ option, type }) {
  const navigate = useNavigate();

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
            component={NavLink}
            to={`create/${label}`}
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

  const assetsButtons = (
    <ButtonGroup orientation="vertical" variant="text">
      {categories.map(({url, label, icon }) => {
        return (
          <Button
            key={label}
            startIcon={
              option === label || type === label ? <ArrowRightIcon name={label} /> : icon
            }
            value={label}
            name={label}
            id={label}
            sx={{ minHeight: 45 }}
            onClick={() => navigate(url)}
            color={option === label || type === label ? "secondary" : "primary"}
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
