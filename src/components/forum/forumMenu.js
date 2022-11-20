import * as React from "react";
import { styled, Stack } from "@mui/system";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";

import "../../App.css";

const pages = ["Discussion", "Fanart", "Assets"];

const ColorButton = styled(Button)((theme) => ({
  color: "white",
  "&:hover": {
    color: "#f37653",
  },
}));

export default function ResponsiveStack() {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Box
        position="static"
        sx={{ bgcolor: "#da57b3", borderRadius: 1, boxShadow: 0 }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          sx={{ bgColor: "#da57b3" }}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Typography
            color="inherit"
            component="div"
            sx={{
              letterSpacing: ".1rem",
              color: "white",
              textDecoration: "none",
              fontWeight: "light",
              fontSize: "medium",
            }}
          >
            Share~
          </Typography>
          {pages.map((page) => (
            <ColorButton>
              <Typography textAlign="center">{page}</Typography>
            </ColorButton>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
