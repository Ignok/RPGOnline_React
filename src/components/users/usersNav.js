import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import { attitudes } from "../../helpers/enums/attitudes";
import SearchBar from "../forum/forumSearch";
import "../../App.css";

function valuetext(value) {
  return `${value} Stars`;
}

export default function UserNav({ params, attitude, rating, onParamChange, onAttitudeChange, onRatingChange }) {
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
        <SearchBar params={params} onParamChange={onParamChange} />
      </Box>
      <Box sx={{display:"flex", alignItems: 'center', flexGrow: 0 }}><Stack direction="row" spacing={{ xs: 2, sm: 5 }}  justifyContent="space-around">
        <FormControl variant="standard" sx={{ minWidth: 120, mt: 1 }}>
          <InputLabel>Attitude</InputLabel>
          <Select
            id="attitude-select"
            value={attitude}
            name="Attitude"
            onChange={onAttitudeChange}
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
            defaultValue={rating}
            getAriaValueText={valuetext}
            valueLabelFormat={valuetext}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={5}
            size="small"
            onChange={onRatingChange}
          />
        </Box>

      </Stack>
      </Box>
      
    </Box>
  );
}
