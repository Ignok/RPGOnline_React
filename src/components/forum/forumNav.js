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

import Box from "@mui/material/Box";

import { styled } from "@mui/system";

export default function ForumNavbar({ params, onParamChange }) {
  const [open, setOpen] = React.useState(false);

  const SidebarBox = styled(Box)(({ theme }) => ({
    bgcolor: "background.paper",
    color: "var(--accent)",
    minWidth: 165,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      padding: 20,
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: 200,
    },
  }));

  const SidebarItemIcon = styled(ListItemIcon)((theme) => ({
    color: "var(--accent)",
  }));
  const SidebarSubItemIcon = styled(ListItemIcon)((theme) => ({
    color: "var(--accent-light)",
    selectable: false,
  }));

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <SidebarBox>
      <List component="nav" sx={{ boxShadow: 1, borderRadius: 1 }}>
        <ListItemButton>
          <SidebarItemIcon>
            <HomeIcon />
          </SidebarItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <SidebarItemIcon>
            <TagIcon />
          </SidebarItemIcon>
          <ListItemText primary="Tags" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              onClick={onParamChange}
              value="fanart"
              name="fanart"
              id="fanart"
              component="button"
              sx={{ pl: 4, color: "var(--accent-light)" }}
            >
              <SidebarSubItemIcon>
                <FanartIcon />
              </SidebarSubItemIcon>
              <ListItemText primary="Fanart" />
            </ListItemButton>

            <ListItemButton
              value="cosplay"
              sx={{ pl: 4, color: "var(--accent-light)" }}
            >
              <SidebarSubItemIcon>
                <CosplayIcon />
              </SidebarSubItemIcon>
              <ListItemText primary="Cosplay" />
            </ListItemButton>

            <ListItemButton
              value="book"
              sx={{ pl: 4, color: "var(--accent-light)" }}
            >
              <SidebarSubItemIcon>
                <MenuBookIcon />
              </SidebarSubItemIcon>
              <ListItemText primary="Lore" />
            </ListItemButton>

            <ListItemButton
              value="notice"
              sx={{ pl: 4, color: "var(--accent-light)" }}
            >
              <SidebarSubItemIcon>
                <FmdBadIcon />
              </SidebarSubItemIcon>
              <ListItemText primary="Notice" />
            </ListItemButton>

            <ListItemButton
              value="help"
              sx={{ pl: 4, color: "var(--accent-light)" }}
            >
              <SidebarSubItemIcon>
                <HelpIcon />
              </SidebarSubItemIcon>
              <ListItemText primary="Help" />
            </ListItemButton>

            {/* <ListItemButton sx={{ pl: 4, color: "var(--accent-light)" }}>
            <SidebarSubItemIcon
        >
              <CharacterIcon />
            </SidebarSubItemIcon
        >
            <ListItemText primary="Character" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4, color: "var(--accent-light)" }}>
            <SidebarSubItemIcon
        >
              <NPCIcon />
            </SidebarSubItemIcon
        >
            <ListItemText primary="NPC" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4, color: "var(--accent-light)" }}>
            <SidebarSubItemIcon
        >
              <MonsterIcon />
            </SidebarSubItemIcon
        >
            <ListItemText primary="Monster" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4, color: "var(--accent-light)" }}>
            <SidebarSubItemIcon
        >
              <RaceIcon />
            </SidebarSubItemIcon
        >
            <ListItemText primary="Race" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4, color: "var(--accent-light)" }}>
            <SidebarSubItemIcon
        >
              <ProfessionIcon />
            </SidebarSubItemIcon
        >
            <ListItemText primary="Profession" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4, color: "var(--accent-light)" }}>
            <SidebarSubItemIcon
        >
              <ItemIcon />
            </SidebarSubItemIcon
        >
            <ListItemText primary="Item" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4, color: "var(--accent-light)" }}>
            <SidebarSubItemIcon
        >
              <SpellIcon />
            </SidebarSubItemIcon
        >
            <ListItemText primary="Spell" />
          </ListItemButton> */}
          </List>
        </Collapse>
        <ListItemButton>
          <SidebarItemIcon>
            <EyeIcon />
          </SidebarItemIcon>
          <ListItemText primary="Followed" />
        </ListItemButton>
        <ListItemButton>
          <SidebarItemIcon>
            <FavoriteIcon />
          </SidebarItemIcon>
          <ListItemText primary="Favorite" />
        </ListItemButton>
      </List>
    </SidebarBox>
  );
}
