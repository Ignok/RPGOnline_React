import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import EmailIcon from "@mui/icons-material/Email";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const settings = ["Unfriend", "Block"];

const ItemDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function FriendItem(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ItemDiv sx={{mb: 1}}>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={props.username} src={props.picture}/>
        </ListItemAvatar>
        <ListItemText primary={props.username} secondary={props.country} />
        <ListItemIcon>
          <Tooltip title="Message">
            <IconButton aria-label="message">
              <EmailIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Follow">
            <IconButton aria-label="follow">
              <BookmarkIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Manage friend">
            <IconButton onClick={handleClick}>
              <PersonRemoveIcon />
            </IconButton>
          </Tooltip>
        </ListItemIcon>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleClose}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </ListItem>
    </ItemDiv>
  );
}
