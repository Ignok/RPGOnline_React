import React, {
  Component,
  useEffect,
  useState,
  componentDidUpdate,
} from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

import SearchBar from "../forum/forumSearch";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { FormGroup } from "@mui/material";

export default function AssetsMenu({
  params,
  onParamChange,
  onLanguageChange,
}) {
  //const [params, setParams] = useState({});

  const [value, setValue] = useState("");
  const handleSelect = (e) => {
    console.log(e);
    setValue(e.target.value ?? "");
    //pass value
  };

  // let helper = () => {
  //   const lang = checked.pl
  //     ? checked.en
  //       ? "BOTH"
  //       : "POLISH"
  //     : checked.en
  //       ? "ENGLISH"
  //       : "BOTH";
  //   console.log(lang);
  // };

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

  const [checked, setChecked] = React.useState({
    en: false,
    pl: false,
  });

  useEffect(() => {
    onLanguageChange(checked);
  }, [checked]);

  const handleCheck = (event) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };

  const { en, pl } = checked;

  const checkLanguage = (
    <FormGroup>
      <FormLabel>Choose preferred languages:</FormLabel>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <FormControlLabel
          control={<Checkbox checked={en} onChange={handleCheck} name="en" />}
          label="English"
        />
        <FormControlLabel
          control={<Checkbox checked={pl} onChange={handleCheck} name="pl" />}
          label="Polish"
        />
      </Box>
    </FormGroup>
  );

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <Box sx={{ width: 100, flexGrow: 1, pt: 2.5, mr: 3 }}>
        <SearchBar params={params} onParamChange={onParamChange} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 0, gap: 4 }}>
        {sortingRadio}
        {checkLanguage}
      </Box>
    </Box>
  );
}
