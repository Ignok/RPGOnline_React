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

import { attitudes } from "../../../../helpers/enums/attitudes";
import { countries } from "../../../../helpers/enums/countries";
import Modal from "@mui/material/Modal";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Badge from "@mui/material/Badge";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { avatars } from "../../../../helpers/enums/avatars";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
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

export default function AboutMeContents({
  uId,
  country,
  city,
  attitude,
  aboutme,
}) {
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setChosen(0);
  };

  const [chosen, setChosen] = React.useState(0);

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
            onClick={() => {
              onProfileEdit({
                country: values.country,
                city: values.city,
                attitude: values.attitude,
                aboutme: values.aboutme,
              });
            }}
            sx={{ flexGrow: 2, fontWeight: "bold" }}
            // loading={updateAboutmeFn.loading}
            // error={updateAboutmeFn.error}
          >
            SAVE CHANGES
          </ColorButton>
          <Box display="flex">
            <ColorButton sx={{ mx: 1 }} onClick={handleOpen}>
              EDIT AVATAR
            </ColorButton>
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
          name="country"
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
          name="city"
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
          name="aboutme"
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
          name="attitude"
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6">
            {chosen}
          </Typography>
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={165}>
            {avatars.map((item) => (
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={item.id === chosen ? <CheckCircleIcon /> : ""}
                sx={{ color: "var(--accent)" }}
              >
                <ImageListItem
                  key={item.img}
                  sx={{
                    border: item.id === chosen ? 5 : 0,
                    borderColor: "var(--accent)",
                  }}
                  onClick={() => setChosen(() => item.id)}
                >
                  <img
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              </Badge>
            ))}
          </ImageList>
        </Box>
      </Modal>
    </Box>
  );
}
