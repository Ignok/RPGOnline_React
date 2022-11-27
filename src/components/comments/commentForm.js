import * as React from "react";
// import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled, Stack, TextField } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

import "../../App.css";

export default function CommentForm() {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    console.log(`Typed => ${e.target.value}`);
    setValue(e.target.value);
  };
    
  return (
    <Card sx={{ mb: 3, boxShadow: 3 }}>
      <Box sx={{ width: "100%", mb: 1 }}>
        <Stack
          direction="row"
          alignItems="baseline"
          backgroundColor="var(--bg)"
          sx={{ mx: 1, mt: 1 }}
        >
          <Avatar
            src={""} //logged user's avatar
            sx={{
              ml: 2,
              mt: 1,
              backgroundColor: "#1976d2",
              color: "var(--bg)",
            }}
          ></Avatar>
          <TextField
            helperText="Write your comment..."
            variant="outlined"
            margin="normal"
            multiline
            sx={{ flexGrow: 1, mx: 2 }}
            value={value}
            onChange={handleChange}
          />
        </Stack>
        <Stack alignItems="flex-end">
          <Button
            variant="contained"
            size="medium"
            endIcon={<SendIcon />}
            sx={{ mr: 3, mb: 2 }}
            onClick={() => {
                console.log(value);
                setValue("");
            }}
          >
            Send
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}
