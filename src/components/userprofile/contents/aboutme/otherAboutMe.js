import * as React from "react";
import { Stack } from "@mui/system";
import Box from "@mui/material/Box";
import { useState } from "react";
import "../../../../App.css";
import { useAsyncFn } from "../../../../hooks/useAsync";
import { Success } from "../../../../helpers/pop-ups/success";
import IconButton from "@mui/material/IconButton";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import DoNotDisturbOffIcon from "@mui/icons-material/DoNotDisturbOff";
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { manageFriendship } from "../../../../services/users";
import Tooltip from "@mui/material/Tooltip";
import { ListItemIcon } from "@mui/material";
import Swal from "sweetalert2";


const options = {
  block: "block",
  unfriend: "unfriend",
  decline: "unfriend",
  unblock: "unblock",
  add: "friend",
  accept: "friend",
  follow: "follow",
  unfollow: "unfollow",
  cancel: "unfriend"
};

const optionMessage = {
  block: "Are you sure you want to block this user?",
  unfriend: "Are you sure you want to unfriend this user?",
  decline: "Are you sure you want to decline this user's invitation?",
  unblock: "Are you sure you want to unblock this user?",
  add: "Are you sure you want to send request to this user?",
  accept: "Are you sure you want to accept this user's invitation?",
  follow: "Are you sure you want to follow this user?",
  unfollow: "Are you sure you want to unfollow this user?",
  cancel: "Are you sure you want to cancel friend request?"
}

export default function OtherAboutMe({ uId, targetUId, friendship }) {

  const [values, setValues] = useState(friendship)

  const handleClick = (buttonAction) => {
    Swal.fire({
      title: optionMessage[buttonAction],
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.isConfirmed) {
        onManageFriendship(options[buttonAction])
      }
    })
  };


  const {loading, error, execute: manageFriendshipFn } = useAsyncFn(manageFriendship);
  function onManageFriendship(option) {
    return manageFriendshipFn({
      uId: uId,
      targetUId: targetUId,
      option: option
    }).then((res) => {
      if(res){
        Success.fire({
          icon: "success",
          title: "Managed friendship status successfully",
        });
        setValues(res)
      }
    }).catch(() => {
      Success.fire({
        icon: "error",
        title: "Something went wrong",
      });
    })
  }


  return (
    <Box>
      {/* USER MENU */}
      <Box
        position="static"
        sx={{
          bgcolor: "var(--accent)",
          boxShadow: 1,
          padding: 1.5,
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={4}
          sx={{ bgColor: "#da57b3", mx: 2 }}
        >
          

          <ListItemIcon>

            {/* Follow status */}
            {values.isFollowed ?
              <Tooltip title="Unollow">
                <IconButton
                  color={"primary"}
                  aria-label="unfollow"
                  onClick={() => handleClick("unfollow")}
                >
                  <BookmarkIcon />
                </IconButton>
              </Tooltip>
              :
              <Tooltip title="Follow">
                <IconButton
                  color={"default"}
                  aria-label="follow"
                  onClick={() => handleClick("follow")}
                >
                  <BookmarkIcon />
                </IconButton>
              </Tooltip>
            }

            {/* Friend status */}
            {values.isFriend ?
              <Tooltip title="Unfriend">
                <IconButton
                  aria-label="unfriend"
                  onClick={() => handleClick("unfriend")}
                >
                  <PersonRemoveIcon />
                </IconButton>
              </Tooltip>
              :
              values.isRequestSent ?
              <Tooltip title="Cancel invitation">
                <IconButton
                  aria-label="cancel invitation"
                  onClick={() => handleClick("cancel")}
                >
                  <PersonAddDisabledIcon />
                </IconButton>
              </Tooltip>
              :
              values.isRequestReceived ?
              <>
              <Tooltip title="Accept invitation">
                <IconButton
                  aria-label="request received"
                  onClick={() => handleClick("accept")}
                >
                  <PersonAddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Decline invitation">
                <IconButton
                  aria-label="request received"
                  onClick={() => handleClick("decline")}
                >
                  <PersonOffIcon />
                </IconButton>
              </Tooltip>
              </>
              
              :
              <Tooltip title="Send request">
                <IconButton
                  aria-label="send request"
                  onClick={() => handleClick("add")}
                >
                  <PersonAddIcon />
                </IconButton>
              </Tooltip>
            }

            {/* Block status */}
            {values.isBlocked ?
              <Tooltip title="Unlock">
                <IconButton
                  aria-label="unblock"
                  onClick={() => handleClick("unblock")}
                >
                  <DoNotDisturbOffIcon />
                </IconButton>
              </Tooltip>
              :
              <Tooltip title="Block">
                <IconButton
                  aria-label="block"
                  onClick={() => handleClick("block")}
                >
                  <DoNotDisturbOnIcon />
                </IconButton>
              </Tooltip>
            }

          </ListItemIcon>
        </Stack>
      </Box>
    </Box>
  );
}
