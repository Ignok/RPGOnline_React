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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import SearchBar from "../forum/forumSearch";
import InputLabel from "@mui/material/InputLabel";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { FormGroup } from "@mui/material";

import { attributes } from "../../helpers/enums/attributes";
import { skills } from "../../helpers/enums/skills";

const exclude = ["character", "monster", "npc"]

function getOptions(cat) {
  switch (cat) {
    case "item":
      return skills;
    case "profession":
      return attributes;
    case "race":
      return attributes;
    case "spell":
      return attributes;
    default:
      return attributes;
  }
}

export default function AssetsMenu({
  params,
  onParamChange,
  onLanguageChange,
  onKeyValueChange,
  onSortChange,
  assetName,
  keyValue,
}) {
  const [sortType, setSortType] = useState("");
  const handleSelectSort = (e) => {
    e.preventDefault();
    
    setSortType(e.target.value ?? "");
    onSortChange(e.target.value);
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
        <IconButton value="cancel" aria-label="cancel" onClick={handleSelectSort} size="small">
          <ClearIcon fontSize="small" />
        </IconButton>
      </Box>
      <RadioGroup
        onChange={handleSelectSort}
        value={sortType}
        row
      >
        <FormControlLabel
          value="date"
          control={<Radio size="small" />}
          label="Date"
        />
        <FormControlLabel
          value="likes"
          control={<Radio size="small" />}
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

  const options = getOptions(assetName.assetName);
  
  const handleSelectKeyValue = (e) => {
    onKeyValueChange(e.target.value);
  };

  const selectKeyValue = (
    <FormControl sx={{ width: 200 }}>
      <TextField
        select
        id="keyValue"
        label="Choose key value"
        value={keyValue.keyValue ?? ""}
        onChange={handleSelectKeyValue}
      >
        <MenuItem key={"No filter"} option={""} value={""}>
          {"No filter"}
        </MenuItem>
        {assetName.assetName === "spell"
          ? options
              .filter(
                (attr) =>
                  attr.value === "charisma" ||
                  attr.value === "intelligence"
              )
              .map((option) => (
                <MenuItem
                  key={option.label}
                  option={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))
          : options.map((option) => (
              <MenuItem
                key={option.label}
                option={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
      </TextField>
    </FormControl>
  );

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", }}>
      <Box sx={{ width: 200, flexGrow: 1, pt: 2.5, mr: 3 }}>
        <SearchBar params={params} onParamChange={onParamChange} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 0, gap: 4 }}>
        {sortingRadio}
        {checkLanguage}
        {assetName === "-" || exclude.includes(assetName.assetName) ? "" : selectKeyValue}
      </Box>
    </Box>
  );
}
