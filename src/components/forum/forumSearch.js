import * as React from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

import "../../App.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "var(--accent)",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.5, 1, 0.5, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "70vw",
  },
}));

export default function SearchBar({ params, onParamChange }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        mb: 1.5,
        border: 2.5,
        borderRadius: "20px",
        color: "var(--accent)",
      }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={onParamChange}
          value = {params.search === undefined ? '' : params.search}
          name='search'
          type = "text"
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </Box>
  );
}
