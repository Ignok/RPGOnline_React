import * as React from "react";
import { styled, Stack } from "@mui/system";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const pages = [
  {name: 'Discussion', link: '/post/discussion-form'},
  {name: 'Fanart', link: '/post/fanart-form'}
];

const ColorButton = styled(Button)((theme) => ({
  color: "white",
  "&:hover": {
    color: "#f37653",
    backgroundColor: "transparent",
  },
}));

export default function ForumMenu() {
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        position="static"
        sx={{
          bgcolor: "var(--accent)",
          borderRadius: 1,
          boxShadow: 1,
          mb: 3,
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          sx={{ bgColor: "#da57b3" }}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Typography
            color="inherit"
            noWrap={true}
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
            <ColorButton key={pages.indexOf(page)} onClick={() => navigate(page.link, { replace: true })} >
              <Typography textAlign="center" variant="h6" noWrap={true}>
                {page.name}
              </Typography>
            </ColorButton>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
