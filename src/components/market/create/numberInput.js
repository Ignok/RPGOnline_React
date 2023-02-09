import React, { useState } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function NumberInput({
  title,
  id,
  value,
  formErrors,
  handleNumberChange,
  handleIncrement,
  handleDecrement,
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <FormControl sx={{ my: 2 }}>
        <InputLabel>{title}</InputLabel>
        <Input
          id={id}
          name={id}
          inputProps={{ maxLength: 2 }}
          onChange={handleNumberChange}
          value={value}
        />
        {formErrors && (
          <p className="text-warning">{formErrors}</p>
        )}
      </FormControl>
      <ButtonGroup size="small" orientation="vertical">
        <IconButton onClick={handleIncrement} id={id}>
          <KeyboardArrowUpIcon />
        </IconButton>
        <IconButton onClick={handleDecrement} id={id}>
          <KeyboardArrowDownIcon />
        </IconButton>
      </ButtonGroup>
    </Box>
  );
}
