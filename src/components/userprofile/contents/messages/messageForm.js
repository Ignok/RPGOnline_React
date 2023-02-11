import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

export default function MessageForm({
  loading,
  error,
  onSubmit,
  onCancel,
  autoFocus = false,
  initialTitle = "",
  initialReceiver = "",
  isReplying = false,
  isInFriendsList = false,
}) {
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorUsernameHelperText, setErrorUsernameHelperText] = useState("");

  const [values, setValues] = useState({
    title: initialTitle,
    receiver: initialReceiver,
    content: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      title: values.title,
      content: values.content,
      receiver: values.receiver,
    })
      .then(() => {
        setValues({
          title: "",
          receiver: (!isInFriendsList ? "" : values.receiver),
          content: "",
        });
        setErrorUsername(false);
        setErrorUsernameHelperText("");
      })
      .catch((e) => {
        if (e.response?.status === 400) {
          if (Object.keys(e.response?.data).includes("Username")) {
            setErrorUsername(true);
            setErrorUsernameHelperText(e.response?.data.Username);
          }
        }
      });
  }

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  function handleCancel() {
    onCancel();
    setValues({
      title: "",
      receiver: initialReceiver,
      content: "",
    });
  }

  return (
    <Box sx={{ mx: 2, my: 2 }}>
      <Card
        sx={{ boxShadow: 3, pr: 4, py: 2 }}
        onSubmit={handleSubmit}
        component="form"
      >
        <Box sx={{ width: "100%", mb: 1 }}>
          <Stack
            direction="column"
            alignItems="baseline"
            backgroundColor="var(--bg)"
            sx={{ mx: 1, mt: 1 }}
          >
            <TextField
              label="Reciver username"
              disabled={isReplying}
              required
              fullWidth
              inputProps={{ maxLength: 40 }}
              variant="outlined"
              margin="normal"
              sx={{ flexGrow: 1, mx: 2 }}
              name="receiver"
              value={values.receiver}
              onInput={handleChange}
              error={errorUsername}
              helperText={errorUsernameHelperText}
            />
            <TextField
              label="Title"
              disabled={isReplying}
              required
              fullWidth
              inputProps={{ maxLength: 40 }}
              variant="outlined"
              margin="normal"
              sx={{ flexGrow: 1, mx: 2 }}
              name="title"
              value={values.title}
              onChange={handleChange}
            />
            <TextField
              autoFocus={autoFocus}
              helperText="Write your message..."
              required
              fullWidth
              inputProps={{ maxLength: 280 }}
              variant="outlined"
              margin="normal"
              multiline
              sx={{ flexGrow: 1, mx: 2 }}
              name="content"
              value={values.content}
              onChange={handleChange}
            />
          </Stack>
          <Stack spacing={10} justifyContent="flex-end" direction="row">
            <Button color="error" onClick={handleCancel} variant="outlined">
              CANCEL
            </Button>
            <Button
              variant="contained"
              size="medium"
              endIcon={<SendIcon />}
              disabled={loading}
              type="submit"
            >
              {loading ? "Loading" : "Send"}
            </Button>
          </Stack>
        </Box>
      </Card>
      <div className="error-msg">{error}</div>
    </Box>
  );
}
