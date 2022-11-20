import * as React from "react";
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
import CharacterIcon from "@mui/icons-material/PsychologyAlt";
import NPCIcon from "@mui/icons-material/Boy";
import MonsterIcon from "@mui/icons-material/SmartToy";
import RaceIcon from "@mui/icons-material/Diversity1";
import ProfessionIcon from "@mui/icons-material/Diversity3";
import ItemIcon from "@mui/icons-material/LocalMall";
import SpellIcon from "@mui/icons-material/AutoFixNormal";

import { styled } from "@mui/system";

export default function ForumNavbar() {
  const [open, setOpen] = React.useState(true);

  const ColorItemIcon = styled(ListItemIcon)((theme) => ({
    color: "var(--accent)",
  }));
  const ColorItemIconSub = styled(ListItemIcon)((theme) => ({
    color: "var(--accent-light)",
  }));

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{
        maxWidth: "auto",
        bgcolor: "background.paper",
              color: "var(--accent)",
      }}
      component="nav"
    >
      <ListItemButton>
        <ColorItemIcon>
          <HomeIcon />
        </ColorItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ColorItemIcon>
          <TagIcon />
        </ColorItemIcon>
        <ListItemText primary="Tags" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4, color: "var(--accent-light)" }}>
            <ColorItemIconSub>
              <FanartIcon />
            </ColorItemIconSub>
            <ListItemText primary="Fanart" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4, color: "var(--accent-light)" }}>
            <ColorItemIconSub>
              <CosplayIcon />
            </ColorItemIconSub>
            <ListItemText primary="Cosplay" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4, color: "var(--accent-light)" }}>
            <ColorItemIconSub>
              <CharacterIcon />
            </ColorItemIconSub>
            <ListItemText primary="Character" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4, color: "var(--accent-light)" }}>
            <ColorItemIconSub>
              <NPCIcon />
            </ColorItemIconSub>
            <ListItemText primary="NPC" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4, color: "var(--accent-light)" }}>
            <ColorItemIconSub>
              <MonsterIcon />
            </ColorItemIconSub>
            <ListItemText primary="Monster" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4, color: "var(--accent-light)" }}>
            <ColorItemIconSub>
              <RaceIcon />
            </ColorItemIconSub>
            <ListItemText primary="Race" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4, color: "var(--accent-light)" }}>
            <ColorItemIconSub>
              <ProfessionIcon />
            </ColorItemIconSub>
            <ListItemText primary="Profession" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4, color: "var(--accent-light)" }}>
            <ColorItemIconSub>
              <ItemIcon />
            </ColorItemIconSub>
            <ListItemText primary="Item" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4, color: "var(--accent-light)" }}>
            <ColorItemIconSub>
              <SpellIcon />
            </ColorItemIconSub>
            <ListItemText primary="Spell" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton>
        <ColorItemIcon>
          <EyeIcon />
        </ColorItemIcon>
        <ListItemText primary="Followed" />
      </ListItemButton>
      <ListItemButton>
        <ColorItemIcon>
          <FavoriteIcon />
        </ColorItemIcon>
        <ListItemText primary="Favorite" />
      </ListItemButton>
    </List>
  );
}
