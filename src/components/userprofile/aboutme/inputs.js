import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import FormLabel from "@mui/material/FormLabel";

const CustomDisableInput = styled(TextField)(() => ({
  ".Mui-disabled": {
    WebkitTextFillColor: "#000",
    color: "black",
  },
}));

export default function CityAboutmeTextField() {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        // maxWidth: "400px"
      }}
      noValidate
      autoComplete="off"
    >
      <FormLabel sx={{ mx: 0.5 }}>City</FormLabel>
      <CustomDisableInput
        disabled
        id="outlined-basic"
        label="City-Label"
        variant="outlined"
        size="small"
        margin="dense"
        sx={{ mb: 3 }}
      />

      <FormLabel sx={{ mx: 0.5 }}>About me</FormLabel>
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