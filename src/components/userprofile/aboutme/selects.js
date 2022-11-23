import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
import { alpha, styled } from "@mui/material/styles";
// ...

//ustawianie tego jako disabled do przemyślenia
const CustomDisableInput = styled(TextField)(() => ({
  ".Mui-disabled": {
    WebkitTextFillColor: "#000",
    color: "black",
  },
}));

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

export function SelectCountry() {
  const [country, setCountry] = React.useState("PL"); //tu trzeba bedzie przekazywac aktualny

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <FormLabel sx={{ mx: 0.5 }}>Country</FormLabel>
      <CustomDisableInput
        select
        disabled
        value={country}
        onChange={handleChange}
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
    </Box>
  );
}

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

export function SelectAttitude() {
  const [attitude, setAttitude] = React.useState("New Gamer"); //tu trzeba bedzie przekazywac aktualny

  const handleChange = (event) => {
    setAttitude(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <FormLabel sx={{ mx: 0.5 }}>Attitude</FormLabel>
      {/* w przyszlosci pewnie stworzyc custom text field dla obu selectorow */}
      <CustomDisableInput
        select
        disabled
        value={attitude}
        onChange={handleChange}
        variant="outlined"
        size="small"
        margin="dense"
        sx={{ mb: 3 }}
      >
        {attitudes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </CustomDisableInput>
    </Box>
  );
}
