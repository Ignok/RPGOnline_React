import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import FormLabel from "@mui/material/FormLabel";
import { Typography } from "@mui/material";

const CustomDisableInput = styled(TextField)(() => ({
  ".Mui-disabled": {
    WebkitTextFillColor: "#000",
    color: "#000",
    backgroundColor: "white",
  },
}));

export default function CityAboutmeTextField() {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        mx: 10,
        // maxWidth: "400px"
      }}
      noValidate
      autoComplete="off"
    >
      <Typography sx={{ mx: 0.5, fontWeight: 500, color: "text.secondary" }}>
        City
      </Typography>{" "}
      <CustomDisableInput
        disabled
        id="outlined-basic"
        variant="outlined"
        size="small"
        margin="dense"
        sx={{ mb: 3 }}
      />
      <Typography sx={{ mx: 0.5, fontWeight: 500, color: "text.secondary" }}>
        About me
      </Typography>
      <CustomDisableInput
        disabled
        value="My journey with tabletop RPGs. Which systems do I play. What are my favorite professions... etc."
        variant="outlined"
        size="small"
        margin="dense"
        sx={{ mb: 3 }}
        multiline
        // maxRows={4}
      />
    </Box>
  );
}