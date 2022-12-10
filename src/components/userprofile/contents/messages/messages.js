import { useEffect, useState } from "react";
import { useUser } from "../../../../contexts/userContext";
import {
  getUserMessages,
  createMessage,
  deleteMessage,
} from "../../../../services/users";
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

  const [creating, setCreating] = useState({
    isCreating: false,
    isReplying: false,
    initialTitle: "",
    initialReceiver: "",
  });

  const {
    loading,
    error,
    execute: getUserMessagesFn,
  } = useAsyncFn(getUserMessages);

  const { execute: createMessageFn } = useAsyncFn(createMessage);
  const { execute: deleteMessageFn } = useAsyncFn(deleteMessage);

  function onMessageCreate({ title, content, receiver }) {
    return createMessageFn({
      senderId: uId,
      receiver: receiver,
      title: title,
      content: content,
    }).then((res) => {
      console.log(res);
      setCreating({
        isCreating: false,
        isReplying: false,
        initialTitle: "",
        initialReceiver: "",
      });
      Success.fire({
        icon: "success",
        title: "Message sent successfully",
      });
    });
  }

  function onMessageDelete({ messageId }) {
    return deleteMessageFn({
      receiverId: uId,
      messageId: messageId,
    }).then((res) => {
      console.log(res);
      setMessages((prevMessages) => {
        return prevMessages.filter(
          (message) => message.messageId !== messageId
        );
      });
      Success.fire({
        icon: "success",
        title: "Message deleted successfully",
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

  function onGetMessages({ isMounted }) {
    return getUserMessagesFn(uId).then((data) => {
      console.log(data);
      console.log(isMounted);
      isMounted && setMessages(data);
    });
  }

  function replying({ initialTitle, initialReceiver }) {
    setCreating({
      isCreating: true,
      isReplying: true,
      initialTitle: "Re: " + initialTitle,
      initialReceiver: initialReceiver,
    });
  }

  useEffect(() => {
    let isMounted = true;
    //const controller = new AbortController();

    onGetMessages({ isMounted });

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
          {!creating.isCreating ? (
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() =>
                setCreating({
                  isCreating: true,
                  isReplying: false,
                  initialTitle: "",
                  initialReceiver: "",
                })
              }
              sx={{ backgroundColor: "var(--accent-light)" }}
            >
              New message
            </Button>
          ) : (
            <ColorButton
              onClick={() =>
                setCreating({
                  isCreating: false,
                  isReplying: false,
                  initialTitle: "",
                  initialReceiver: "",
                })
              }
            >
              CANCEL MESSAGE
            </ColorButton>
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
                onClick={() => onGetMessages({ isMounted: true })}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
      {creating.isCreating ? (
        <MessageForm
          loading={loading}
          error={error}
          onSubmit={onMessageCreate}
          isReplying={creating.isReplying}
          initialReceiver={creating.initialReceiver}
          initialTitle={creating.initialTitle}
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
                <MessageItem
                  key={message.messageId}
                  message={message}
                  onDelete={onMessageDelete}
                  onReply={replying}
                />
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
