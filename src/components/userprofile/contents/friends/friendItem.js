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
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import DoNotDisturbOffIcon from "@mui/icons-material/DoNotDisturbOff";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EmailIcon from "@mui/icons-material/Email";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Collapse } from "@mui/material";

import { getImage } from "../../../../helpers/functions/getImage";
import MessageForm from "../messages/messageForm";
import { useAsyncFn } from "../../../../hooks/useAsync";
import { createMessage } from "../../../../services/messages";
import { manageFriendship } from "../../../../services/users"
import { Success } from "../../../../helpers/pop-ups/success";

const settings = ["unfriend", "block"];
const ItemDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const options = {
  block: "block",
  unfriend: "unfriend",
  decline: "unfriend",
  unblock: "unblock",
  add: "",
  accept: "friend",
};

export default function FriendItem(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState(null);

  const handleClose = (currentAction) => {
    setAnchorEl(null);
    if (settings.includes(currentAction)) {
      setOpen(true);
      setAction(currentAction);
    }
  };
  const handleButtonClose = (buttonAction) => {
    setOpen(true);
    setAction(buttonAction);
  };

  const [openMessageForm, setOpenMessageForm] = React.useState(false);
  

  const { execute: createMessageFn } = useAsyncFn(createMessage);
  function onMessageCreate({ title, content, receiver }) {
    return createMessageFn({
      senderId: props.senderId,
      receiver: receiver,
      title: title,
      content: content,
    }).then((res) => {
      setOpenMessageForm(false);
      console.log(res);
      Success.fire({
        icon: "success",
        title: "Message sent successfully",
      });
    });
  }

  const { execute: manageFriendshipFn } = useAsyncFn(manageFriendship);
  function onManageFriendship(option) {
    console.log(option)
    return manageFriendshipFn({
      uId: props.senderId,
      targetUId: props.friendUId,
      option: option
    }).then((res) => {
      console.log(res)
      Success.fire({
        icon: "success",
        title: "Managed friend successfully",
      });
      props.reload()
    }).catch((err) => {
      console.log(err)
      Success.fire({
        icon: "error",
        title: "Something went wrong",
      });
    })
  }

  function handleCancel() {
    return setOpenMessageForm(!openMessageForm);
  }

  return (
    <ItemDiv sx={{ mb: 1 }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={props.username} src={getImage(props.picture).img} />
        </ListItemAvatar>
        <ListItemText
          primary={props.username}
          secondary={`${props.country} ${props.country===""?"":"/"} ${props.attitude}`}
        />
        {props.contents === "blocked" ? (
          <ListItemIcon>
            <Tooltip title="Unblock">
              <IconButton
                aria-label="unblock"
                onClick={() => handleButtonClose("unblock")}
              >
                <DoNotDisturbOffIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add friend">
              <IconButton
                aria-label="add"
                onClick={() => handleButtonClose("add")}
              >
                <PersonAddAlt1Icon />
              </IconButton>
            </Tooltip>
          </ListItemIcon>
        ) : props.contents === "requests" ? (
          <ListItemIcon>
            <Tooltip title="Decline">
              <IconButton
                aria-label="decline"
                onClick={() => handleButtonClose("decline")}
              >
                <HighlightOffIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Accept">
              <IconButton
                aria-label="accept"
                onClick={() => handleButtonClose("accept")}
              >
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
          </ListItemIcon>
        ) : (
          <div>
            <ListItemIcon>
              <Tooltip title="Message">
                <IconButton
                  aria-label="message"
                  onClick={() => setOpenMessageForm(!openMessageForm)}
                >
                  <EmailIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Follow">
                <IconButton aria-label="follow">
                  <BookmarkIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Manage friend">
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
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
                <MenuItem key={setting} onClick={() => handleClose(setting)}>
                  <Typography
                    textAlign="center"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>
        )}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to {action} this user?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="dialog-description">
              {action === "block"
                ? "This user won't be able to view your profile and won't see any of your activity. Simmilarly, this user won't show up in your Forum section."
                : action === "unfriend"
                ? "This action will remove selected user from your friends list."
                : action === "unblock"
                ? "This user will be able to view your profile. They will also show up in your forum section."
                : action === "add"
                ? "This action will unblock that user and send a friend request to them."
                : action === "accept"
                ? "This user will be added to your friend list"
                : ""}
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ px: 5, justifyContent: "space-between" }}>
            <Button onClick={() => setOpen(false)} autoFocus >No</Button>
            <Button onClick={() => {
                setOpen(false)
                onManageFriendship(options[action])
              }}>Yes</Button>
          </DialogActions>
        </Dialog>
      </ListItem>
      <Collapse in={openMessageForm}>
        <MessageForm
          isReplying={false}
          initialReceiver={props.username}
          initialTitle={""}
          isInFriendsList={true}
          onSubmit={onMessageCreate}
          onCancel={handleCancel}
        />
      </Collapse>
    </ItemDiv>
  );
}
