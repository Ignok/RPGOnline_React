import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled, Stack, TextField } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";


export default function MessageForm({
    loading,
    error,
    onSubmit,
    autoFocus = false,
    initialTitle = "",
    initialReceiver ="",
    receiverId = "",
    isResponse = false
}) {


    const [errorUsername, setErrorUsername] = useState(false);
    const [errorUsernameHelperText, setErrorUsernameHelperText] = useState("");

    const [values, setValues] = useState({
        title: initialTitle,
        receiver: initialReceiver,
        content: ""
    });

    function handleSubmit(e) {
        e.preventDefault()
        console.log(values)
        
        onSubmit({title: values.title, content: values.content, receiver: values.receiver})
            .then(() => {
                setValues({
                    title: "",
                    receiver: "",
                    content: ""
                })
                setErrorUsername(false)
                setErrorUsernameHelperText("")
            })
            .catch(e => {
                if (e.status === 400) {
                    if (Object.keys(e.data).includes("Username")){
                        setErrorUsername(true)
                        setErrorUsernameHelperText(e.data.Username)
                    }
            }})
      }

      const handleChange = (event) => {
        console.log(event.target.value)

        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

      return (
        <Box>
          <Card sx={{ my: 2, boxShadow: 3, pr: 4, py: 3 }} onSubmit={handleSubmit} component="form">
            <Box sx={{ width: "100%", mb: 1 }}>
              <Stack
                direction="column"
                alignItems="baseline"
                backgroundColor="var(--bg)"
                sx={{ mx: 1, mt: 1 }}
              >
                <TextField
                  label="Reciver username"
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
              <Stack alignItems="flex-end">
                <Button
                  variant="contained"
                  size="medium"
                  endIcon={<SendIcon />}
                  sx={{ mr: 3, mb: 2 }}
                  disabled={loading}
                  type="submit"
                >
                  {loading ? "Loading" : "Send"}
                </Button>
              </Stack>
            </Box>
          </Card>
          <div className="error-msg">
            {error && console.log(error)}
          </div>
        </Box>
      );
}