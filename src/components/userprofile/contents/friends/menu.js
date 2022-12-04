import * as React from "react";
import { styled, Stack } from "@mui/system";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import "../../../../App.css";

const ColorButton = styled(Button)(() => ({
  color: "white",
  "&:hover": {
    color: "#f37653",
    backgroundColor: "transparent",
  },
}));

export default function FriendsMenu() {
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
          FRIENDS
        </Typography>
        {/* dodac FRIEND LIST kiedy sie jest w widoku requests/blocked */}
        <ColorButton sx={{ flexGrow: 2, fontWeight: "bold" }}>
          FRIEND REQUESTS
        </ColorButton>
        <ColorButton sx={{ flexGrow: 2, fontWeight: "bold" }}>
          BLOCKED
        </ColorButton>
      </Stack>
    </Box>
  );
}
