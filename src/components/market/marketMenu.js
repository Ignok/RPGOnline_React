import React, { Component, useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import SearchBar from "../forum/forumSearch";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

export default function AssetsMenu({ params, onParamChange }) {
  //const [params, setParams] = useState({});

  const [value, setValue] = useState("");
  const handleSelect = (e) => {
    console.log(e)
    setValue(e.target.value ?? "");
    //pass value
  };

  const sortingRadio = (
    <FormControl>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <FormLabel>Sort by</FormLabel>
        <IconButton aria-label="cancel" onClick={handleSelect} size="small">
          <ClearIcon fontSize="small" />
        </IconButton>
      </Box>
      <RadioGroup value={value} row>
        <FormControlLabel
          value="date"
          control={<Radio size="small" onClick={handleSelect} />}
          label="Date"
        />
        <FormControlLabel
          value="likes"
          control={<Radio size="small" onClick={handleSelect} />}
          label="Likes"
        />
      </RadioGroup>
    </FormControl>
  );

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <Box sx={{ width: 300, flexGrow: 1, pt: 2.5, mr: 3 }}>
        <SearchBar params={params} onParamChange={onParamChange} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 0 }}>
        {sortingRadio}
        <Button
          variant="contained"
          endIcon={<SearchIcon />}
          sx={{ ml: 3, minWidth: 120 }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
}
