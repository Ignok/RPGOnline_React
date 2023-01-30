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
import { AvatarForm } from "./avatarForm";

import { avatars } from "../../../../helpers/enums/avatars";
import { useParams, useOutletContext } from "react-router-dom";
import { Success } from "../../../../helpers/pop-ups/success";

const ColorButton = styled(Button)(() => ({
  color: "white",
  "&:hover": {
    color: "#f37653",
    backgroundColor: "transparent",
  },
}));


export default function OtherAboutMe({ friendship }) {
  const [isDisabled, setIsDisabled] = useState(true);

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
              console.log(friendship)
            }}
            sx={{ flexGrow: 2, fontWeight: "bold" }}
            // loading={updateAboutmeFn.loading}
            // error={updateAboutmeFn.error}
          >
            SAVE CHANGES
          </ColorButton>
          <Box display="flex">
            <ColorButton sx={{ mx: 1 }} onClick={() => console.log(friendship)}>
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
    </Box>
  );
}
