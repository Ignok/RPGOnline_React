import * as React from "react";
import { styled } from "@mui/material/styles";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import DraftsIcon from "@mui/icons-material/Drafts";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ListItemButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatetimeToLocaleDateString } from "../../../../helpers/functions/DateTimeConverter";
import { Collapse } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import Swal from "sweetalert2";
import { getImage } from "../../../../helpers/functions/getImage";

const ItemDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function MessageItem({ message, onDelete, onReply, onOpen }) {
  const [open, setOpen] = React.useState(false);

  const expandMessage = () => {
    setOpen(!open);
    if(!message.isOpened){
      handleSetOpen();
    }
  };

  function handleDelete(e) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        e.preventDefault();
        onDelete({ messageId: message.messageId })
          .then(() => {
            Swal.fire("Deleted!", "Message has been deleted.", "success");
          })
          .catch((e) => {
            if (e.status === 400) {
              Swal.fire(
                "Error",
                "This message is already deleted, try refreshing page.",
                "error"
              );
            }
          });
      }
    });
  }

  function handleReply(e) {
    onReply({
      initialTitle: message.title,
      initialReceiver: message.senderUsername,
    });
  }

  function handleSetOpen(e) {
    onOpen({
      messageId: message.messageId
    })
  }

  return (
    <ItemDiv sx={{ mb: 1 }}>
      <ListItemButton alignItems="flex-start" onClick={expandMessage}>
        <ListItemAvatar>
          <Avatar
            alt={message.senderUsername}
            src={getImage(message.senderPicture).img}
          />
        </ListItemAvatar>
        <ListItemText
          primary={message.title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {message.senderUsername}
              </Typography>
              {" - " + DatetimeToLocaleDateString(message.sendDate)}
            </React.Fragment>
          }
        />

        <ListItemIcon>
        {
          message.isOpened
            ?
            <ListItemIcon>
              <Tooltip title="Opened">
                <DraftsIcon />
              </Tooltip>
            </ListItemIcon>
            :
            <ListItemIcon>
              <Tooltip title="Not opened">
                <EmailIcon/>
              </Tooltip>
            </ListItemIcon>
        }
            </ListItemIcon>
        

        <ListItemIcon>
          <Tooltip title="Reply">
            <IconButton aria-label="reply" onClick={handleReply}>
              <ReplyIcon />
            </IconButton>
          </Tooltip>
        </ListItemIcon>
        <ListItemIcon>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ListItemIcon>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Typography
          noWrap={false}
          variant="body2"
          color="text.secondary"
          margin={2}
          sx={{ pl: 3, pb: 1, maxWidth: 500 }}
        >
          {message.content}
        </Typography>
      </Collapse>
    </ItemDiv>
  );
}
