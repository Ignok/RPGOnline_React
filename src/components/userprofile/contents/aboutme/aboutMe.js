import * as React from "react";
import { styled, Stack } from "@mui/system";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

import "../../../../App.css";
import { useAsync, useAsyncFn } from "../../../../hooks/useAsync";
import { editProfile } from "../../../../services/users";

// const pages = ["SAVE CHANGES", "EDIT AVATAR", "EDIT PROFILE"];

const countries = [
  {
    value: "Poland",
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
  {
    value: "JP",
    label: "Japan",
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
    value: "Eager to play",
    label: "Adventurous",
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

export default function AboutMeContents({ uId, country, city, attitude, aboutme }) {
  const [isDisabled, setIsDisabled] = useState(true);

  const [values, setValues] = useState({
    country: country,
    city: city,
    attitude: attitude,
    aboutme: aboutme,
  });

  const handleChange = (e) => {
    console.log(e.target.value);

    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const [contents, setContents] = useState();

  const { execute: editProfileFn } = useAsyncFn(editProfile);

  function onProfileEdit({ country, city, attitude, aboutme }) {
    if (isDisabled !== true) {
      setIsDisabled(() => true);
      return editProfileFn({
        uId: uId,
        country: country,
        city: city,
        attitude: attitude,
        aboutme: aboutme,
      }).then((res) => {
        console.log("udalo sb");
        console.log(res);
        setContents((prev) => {
          return prev;
        });

        //pop-up że się udało
      });
    }
  }

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

          <ColorButton
            onClick={onProfileEdit}
            sx={{ flexGrow: 2, fontWeight: "bold" }}
            // loading={updateAboutmeFn.loading}
            // error={updateAboutmeFn.error}
          >
            SAVE CHANGES
          </ColorButton>
          <Box display="flex">
            <ColorButton sx={{ mx: 1 }}>EDIT AVATAR</ColorButton>
            <Divider orientation="vertical" color="white" flexItem />
            <ColorButton
              onClick={() => setIsDisabled((prev) => !prev)}
              sx={{ mx: 1 }}
            >
              {isDisabled ? "EDIT PROFILE" : "CANCEL EDIT"}
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
        <Typography sx={{ mx: 0.5, fontWeight: 500, color: "text.secondary" }}>
          Country
        </Typography>
        <CustomDisableInput
          select
          disabled={isDisabled}
          value={values.country}
          onChange={handleChange}
          id="country"
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
        <Typography sx={{ mx: 0.5, fontWeight: 500, color: "text.secondary" }}>
          City
        </Typography>{" "}
        <CustomDisableInput
          disabled={isDisabled}
          value={values.city}
          onChange={handleChange}
          id="city"
          variant="outlined"
          size="small"
          margin="dense"
          sx={{ mb: 3 }}
        />
        <Typography sx={{ mx: 0.5, fontWeight: 500, color: "text.secondary" }}>
          About me
        </Typography>
        <CustomDisableInput
          disabled={isDisabled}
          value={values.aboutme}
          onChange={handleChange}
          id="aboutme"
          variant="outlined"
          size="small"
          margin="dense"
          sx={{ mb: 3 }}
          multiline
          // maxRows={4}
        />
        <Typography sx={{ mx: 0.5, fontWeight: 500, color: "text.secondary" }}>
          Attitude
        </Typography>
        <CustomDisableInput
          select
          disabled={isDisabled}
          value={values.attitude}
          onChange={handleChange}
          id="attitude"
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
