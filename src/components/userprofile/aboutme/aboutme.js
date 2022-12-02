import * as React from "react";
import { styled, Stack } from "@mui/system";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import "../../../App.css";

// const pages = ["SAVE CHANGES", "EDIT AVATAR", "EDIT PROFILE"];

const countries = [
  {
    value: "PL",
    label: "Poland",
  },
  {
    value: "UA",
    label: "Ukraine",
  },
  {
    value: "GB",
    label: "Great Britain",
  },
];

const attitudes = [
  {
    value: "Epic GM",
    label: "Epic GM",
  },
  {
    value: "Experienced",
    label: "Experienced",
  },
  {
    value: "Casual Player",
    label: "Casual Player",
  },
  {
    value: "New User",
    label: "New User",
  },
];

const ColorButton = styled(Button)(() => ({
  color: "white",
  "&:hover": {
    color: "#f37653",
    backgroundColor: "transparent",
  },
}));

const CustomDisableInput = styled(TextField)(() => ({
  backgroundColor: "white",

  ".Mui-disabled": {
    WebkitTextFillColor: "#000",
    color: "#000",
    backgroundColor: "white",
  },
}));

export default function AboutMeContents() {
  const [edit, setDisabled] = React.useState(true);
  const handleDisabledChange = (e) => {
    if (edit === true) {
      setDisabled(false);
    }
  };
  const handleSaveChanges = (e) => {
    setDisabled(true);
  }

  const [country, setCountry] = React.useState("PL"); //tu trzeba bedzie przekazywac aktualny
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const [attitude, setAttitude] = React.useState("New Gamer"); //tu trzeba bedzie przekazywac aktualny
  const handleAttitudeChange = (e) => {
    setAttitude(e.target.value);
  };

  return (
    <Box>
      {/* USER MENU */}
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

          <ColorButton onClick={handleSaveChanges} sx={{ flexGrow: 2, fontWeight: "bold" }}>
            SAVE CHANGES
          </ColorButton>
          <Box display="flex">
            <ColorButton sx={{ mx: 1 }}>EDIT AVATAR</ColorButton>
            <Divider orientation="vertical" color="white" flexItem />
            <ColorButton onClick={handleDisabledChange} sx={{ mx: 1 }}>
              EDIT PROFILE
            </ColorButton>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          border: 1,
          borderRadius: 0,
          borderColor: "var(--accent)",
          backgroundColor: "var(--accent-opaque)",
          mt: 2,
          display: "flex",
          flexDirection: "column",
          py: 3,
          px: 10,
        }}
      >
        {/* SELECT COUNTRY */}
        <Typography sx={{ mx: 0.5, fontWeight: 500, color: "text.secondary" }}>
          Country
        </Typography>
        <CustomDisableInput
          select
          disabled={edit}
          value={country}
          onChange={handleCountryChange}
          variant="outlined"
          size="small"
          margin="dense"
          sx={{ mb: 3 }}
        >
          {countries.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </CustomDisableInput>
        {/* CITY INPUT */}
        <Typography sx={{ mx: 0.5, fontWeight: 500, color: "text.secondary" }}>
          City
        </Typography>{" "}
        <CustomDisableInput
          disabled={edit}
          id="outlined-basic"
          variant="outlined"
          size="small"
          margin="dense"
          sx={{ mb: 3 }}
        />
        {/* ABOUT ME INPUT */}
        <Typography sx={{ mx: 0.5, fontWeight: 500, color: "text.secondary" }}>
          About me
        </Typography>
        <CustomDisableInput
          disabled={edit}
          value="My journey with tabletop RPGs. Which systems do I play. What are my favorite professions... etc."
          variant="outlined"
          size="small"
          margin="dense"
          sx={{ mb: 3 }}
          multiline
          // maxRows={4}
        />
        {/* SELECT ATTITUDE /> */}
        <Typography sx={{ mx: 0.5, fontWeight: 500, color: "text.secondary" }}>
          Attitude
        </Typography>
        {/* w przyszlosci pewnie stworzyc custom text field dla obu selectorow */}
        <CustomDisableInput
          select
          disabled={edit}
          value={attitude}
          onChange={handleAttitudeChange}
          variant="outlined"
          size="small"
          margin="dense"
        >
          {attitudes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </CustomDisableInput>
      </Box>
    </Box>
  );
}
