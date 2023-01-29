import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';

import { attitudes } from "../../helpers/enums/attitudes";

import SearchBar from "../forum/forumSearch";
import "../../App.css";

function valuetext(value) {
  return `${value} Stars`;
}

export default function UserNav() {
  const [attitude, setAttitude] = useState("");
  const [params, setParams] = useState({});

  const handleChange = (e) => {
    setAttitude(e.target.value);
  };

  function handleParamChange(e) {
    e.preventDefault();
    console.log(e);
    const param = e.target.getAttribute("name");
    const value = e.target.value;
    // setPage(1)
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    })
  }

  return (
    <Box
      sx={{
        borderRadius: 1,
        mb: 5,
        px: 3,
        pt: 1,
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ width: 300, flexGrow: 1, pt: 2.5, mr: 5 }}>
        <SearchBar params={params} onParamChange={handleParamChange} />
      </Box>
      <Box sx={{display:"flex", alignItems: 'center', flexGrow: 0 }}><Stack direction="row" spacing={{ xs: 2, sm: 5 }}  justifyContent="space-around">
        <FormControl variant="standard" sx={{ minWidth: 120, mt: 1 }}>
          <InputLabel>Attitude</InputLabel>
          <Select
            id="attitude-select"
            value={attitude}
            onChange={handleChange}
            label="Attitude"
          >
            <MenuItem value="">
              <em>No filter</em>
            </MenuItem>
            {attitudes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
        <Box sx={{ width: 150, pt: 1.5 }}>
          <Typography id="irating-slider" gutterBottom>
            Minimum Rating
          </Typography>
          <Slider
            aria-label="Rating"
            track="inverted"
            defaultValue={4}
            getAriaValueText={valuetext}
            valueLabelFormat={valuetext}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={5}
            size="small"
          />
        </Box>

      </Stack>
      <Button variant="contained" endIcon={<SearchIcon />} sx={{ ml: {xs: 2, sm: 5}, minWidth: 120}}>
        Search
      </Button>
      </Box>
      
    </Box>
  );
}
