import { useEffect, useState } from "react";
import {
  getUserMessages,
  createMessage,
  deleteMessage,
  openMessage,
} from "../../../../services/messages";
import { useAsyncFn } from "../../../../hooks/useAsync";
import {
  Button,
  List,
  IconButton,
} from "@mui/material";
import MessageItem from "./messageItem";
import SendIcon from "@mui/icons-material/Send";
import MessageForm from "./messageForm";
import { Success } from "../../../../helpers/pop-ups/success";
import { Box } from "@mui/material";
import { styled, Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import RefreshIcon from "@mui/icons-material/Refresh";
import Tooltip from "@mui/material/Tooltip";
import Pagination from "@mui/material/Pagination";
import { Collapse } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";


const ColorButton = styled(Button)(() => ({
  color: "white",
  "&:hover": {
    color: "#f37653",
    backgroundColor: "transparent",
  },
}));

export default function MessagesContents() {
  const [messages, setMessages] = useState();

  const { auth } = useAuth();

  const navigate = useNavigate();

  const [user] = useOutletContext();

  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(1);

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
  const { execute: setOpenMessageFn } = useAsyncFn(openMessage);

  function onMessageCreate({ title, content, receiver }) {
    return createMessageFn({
      senderId: user.uId,
      receiver: receiver,
      title: title,
      content: content,
    }).then((res) => {
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
      receiverId: user.uId,
      messageId: messageId,
    }).then((res) => {
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

  function onGetMessages({ isMounted, page }) {
    if(auth.uId !== user.uId){
      navigate(`/Profile/${auth.uId}/messages`)
    }else{
      return getUserMessagesFn({uId: user.uId, page }).then((data) => {
        setPageCount(data.pageCount);
        isMounted && setMessages(data.item1);
      });
    }
    
  }

  function replying({ initialTitle, initialReceiver }) {
    return setCreating({
      isCreating: true,
      isReplying: true,
      initialTitle: "Re: " + initialTitle,
      initialReceiver: initialReceiver,
    });
  }



  function setOpened({ messageId }) {
    return setOpenMessageFn({
      uId: user.uId,
      messageId: messageId,
    }).then((res) => {
      const newMessages = messages.map((message) => {
        if(message.messageId === messageId){
          const updatedMessage = {
            ...message,
            isOpened: true,
          };

          return updatedMessage
        }

        return message
      });

      setMessages(newMessages);
    });
  }

  function handleCancel() {
    return setCreating({
      isCreating: false,
      isReplying: false,
      initialTitle: "",
      initialReceiver: "",
    });
  }

  useEffect(() => {
    let isMounted = true;
    setPage(1);
    onGetMessages({ isMounted, page: 1 });

    return () => {
      isMounted = false;
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
            <ColorButton onClick={handleCancel}>CANCEL MESSAGE</ColorButton>
          )}
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <Divider orientation="vertical" color="white" flexItem />
            <Tooltip title="Refresh">
              <IconButton
                aria-label="refresh"
                sx={{ color: "var(--bg)" }}
                onClick={() => {
                  setPage(1);
                  onGetMessages({ isMounted: true, page: 1 });
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Collapse in={creating.isCreating}>
          {creating.isCreating && (
            <MessageForm
              loading={loading}
              error={error}
              onSubmit={onMessageCreate}
              onCancel={handleCancel}
              isReplying={creating.isReplying}
              initialReceiver={creating.initialReceiver}
              initialTitle={creating.initialTitle}
            />
          )}
        </Collapse>
      </Box>
      {loading ? (
        <h1>Loading . . .</h1>
      ) : messages?.length ? (
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
              onOpen={setOpened}
            />
          ))}
        </List>
      ) : (
        <h4>No messages to display</h4>
      )}

      <Pagination
        count={pageCount}
        page={page}
        onChange={(e, p) => {
          setPage(p);
          onGetMessages({ isMounted: true, page: p });
        }}
        color="secondary"
        size="large"
        showFirstButton
        showLastButton
        sx={{
          ".MuiTablePagination-root": {
            display: "flex",
            justifyContent: "center",
          },
        }}
      />
    </Box>
  );
}
