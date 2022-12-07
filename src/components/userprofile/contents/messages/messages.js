import { useEffect, useState } from "react";
import { useUser } from "../../../../contexts/userContext";
import { getUserMessages, createMessage } from "../../../../services/users";
import { useAsyncFn } from "../../../../hooks/useAsync";
import { DatetimeToLocaleDateString } from "../../../../helpers/functions/DateTimeConverter";
import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  ButtonBase,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageItem from "./messageItem";
import SendIcon from "@mui/icons-material/Send";
import MessageForm from "./messageForm";
import Swal from "sweetalert2";
import { Box } from "@mui/material";
import { styled, Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import { ButtonProps } from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import RefreshIcon from "@mui/icons-material/Refresh";
import Tooltip from "@mui/material/Tooltip";

const ColorButton = styled(Button)(() => ({
  color: "white",
  "&:hover": {
    color: "#f37653",
    backgroundColor: "transparent",
  },
}));

export default function MessagesContents({ uId }) {
  const [messages, setMessages] = useState();

  const [isCreating, setIsCreating] = useState(false);

  const {
    loading,
    error,
    execute: getUserMessagesFn,
  } = useAsyncFn(getUserMessages);

  const { execute: createMessageFn } = useAsyncFn(createMessage);

  function onMessageCreate({ title, content, receiver }) {
    return createMessageFn({
      senderId: uId,
      receiver: receiver,
      title: title,
      content: content,
    }).then((res) => {
      console.log(res);
      setIsCreating(false);
      Success.fire({
        icon: "success",
        title: "Message sent successfully",
      });
    });
  }
  const Success = Swal.mixin({
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    let isMounted = true;
    //const controller = new AbortController();

    getUserMessagesFn(uId).then((data) => {
      console.log(data);
      isMounted && setMessages(data);
    });

    return () => {
      isMounted = false;
      //controller.abort();
    };
  }, []);

  return (
    <Box>
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
          justifyContent="center"
          alignItems="center"
          spacing={4}
          sx={{ bgColor: "#da57b3", justifyContent: "space-around" }}
        >
          <Typography
            variant="h6"
            align="center"
            sx={{
              display: { xs: "none", sm: "none", md: "inline" },
              color: "white",
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            MESSAGES
          </Typography>
          {!isCreating ? (
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => setIsCreating(true)}
              sx={{ backgroundColor: "var(--accent-light)" }}
            >
              New message
            </Button>
          ) : (
            <ColorButton onClick={() => setIsCreating(false)}>CANCEL MESSAGE</ColorButton>
          )}
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <ColorButton>INBOX</ColorButton>
            <Divider orientation="vertical" color="white" flexItem />
            <ColorButton>OUTBOX</ColorButton>
            <Divider orientation="vertical" color="white" flexItem />
            <Tooltip title="Refresh">
              <IconButton
                aria-label="refresh"
                sx={{ color: "var(--bg)" }}
                // onClick={() => refresh}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
      {isCreating ? (
        <MessageForm
          loading={loading}
          error={error}
          onSubmit={onMessageCreate}
        />
      ) : (
        <>
          {messages?.length ? (
            <List
              sx={{
                border: 1,
                borderRadius: 0,
                borderColor: "var(--accent)",
                backgroundColor: "var(--accent-opaque)",
                my: 2,
                display: "flex",
                flexDirection: "column",
                py: 3,
                px: 10,
              }}
            >
              {messages.map((message) => (
                <MessageItem key={message.messageId} message={message} />
              ))}
            </List>
          ) : (
            <h4>No messages to display</h4>
          )}
        </>
      )}
    </Box>
  );
}
