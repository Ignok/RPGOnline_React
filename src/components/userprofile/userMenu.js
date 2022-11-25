import * as React from "react";
import { styled, Stack } from "@mui/system";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";

import "../../App.css";

const pages = ["SAVE CHANGES", "EDIT AVATAR", "EDIT PROFILE"];

const ColorButton = styled(Button)((theme) => ({
  color: "white",
  "&:hover": {
    color: "#f37653",
    backgroundColor: "transparent",
  },
}));

export default function UserMenu() {
  return (
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
        sx={{ bgColor: "#da57b3", mx: 2 }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "none", md: "inline" },
            color: "white",
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          MY PROFILE
        </Typography>

        <ColorButton sx={{ flexGrow: 2, fontWeight: "bold" }}>
          SAVE CHANGES
        </ColorButton>
        <Box display="flex">
          <ColorButton sx={{ mx: 1 }}>EDIT AVATAR</ColorButton>
          <Divider orientation="vertical" color="white" flexItem />
          <ColorButton sx={{ mx: 1 }}>EDIT PROFILE</ColorButton>
        </Box>
      </Stack>
    </Box>
  );
}
