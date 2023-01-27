import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { SettingsAccessibility } from "@mui/icons-material";
import {
  FormControl,
  Input,
  FormHelperText,
  InputLabel,
  Button,
  TextField,
  MenuItem,
  Link,
} from "@mui/material";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import successfulGif from "../../../helpers/pictures/post_added_successfully.gif";
import useAuth from "../../../hooks/useAuth";

import { createSpell } from "../../../services/assets";
import { useAsyncFn } from "../../../hooks/useAsync";
import { spell } from "../../../helpers/enums/assets";

import { attributes } from "../../../helpers/enums/attributes";
import { availabilities } from "../../../helpers/enums/assets";

import { styled } from "@mui/material/styles";

const minValueInput = 0;
const maxValueInput = 20;

export default function SpellForm() {
  const { auth } = useAuth();
  const [values, setValues] = useState({
    Name: "",
    Description: "",
    Effects: "",
    KeyAttribute: "",
    MinValue: 0,
    ManaCost: 0,
    IsPublic: true,
  });

  const { execute: createSpellFn } = useAsyncFn(createSpell);

  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    console.log(
      "handle change " + event.target.name + " - " + event.target.value
    );
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  // const [checked, setChecked] = useState(values.IsPublic);
  const handleCheck = (event) => {
    const value = event.target.checked;
    //setChecked(event.target.checked);
    console.log(event.target.checked);
    setValues((values) => ({
      ...values,
      [event.target.name]: value,
    }));
  };

  // const [counter, setCounter] = useState(0);
  // const [manaCounter, setManaCounter] = useState(0);

  const [counter, setCounter] = useState({
    ManaCost: 0,
    MinValue: 0,
  });

  const handleIncrement = (event) => {
    const target = event.currentTarget.id;
    const tmp = counter[target];
    const newCount = tmp + 1 >= maxValueInput ? maxValueInput : tmp + 1;
    setCounter((values) => ({
      ...values,
      [`${target}`]: newCount,
    }));
    setValues((values) => ({
      ...values,
      [target]: newCount,
    }));
    // if (target === "ManaCost") {
    //   setManaCounter((count) => (count + 1 >= 20 ? 20 : count + 1));
    //   setValues((values) => ({
    //     ...values,
    //     [target]: manaCounter,
    //   }));
    // } else if (target === "MinValue") {
    //   setCounter((count) => (count + 1 >= 20 ? 20 : count + 1));
    //   setValues((values) => ({
    //     ...values,
    //     [target]: counter,
    //   }));
    // }
  };

  const handleDecrement = (event) => {
    const target = event.currentTarget.id;
    const tmp = counter[target];
    const newCount = tmp - 1 <= minValueInput ? minValueInput : tmp - 1;
    setCounter((values) => ({
      ...values,
      [`${target}`]: newCount,
    }));
    setValues((values) => ({
      ...values,
      [target]: newCount,
    }));
  };

  const handleNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const result = Math.max(
      minValueInput,
      Math.min(maxValueInput, Number(value))
    );
    console.log("UWAG   " + event.target.name);
    setCounter((values) => ({
      ...values,
      [`${event.target.name}`]: result,
    }));
    setValues((values) => ({
      ...values,
      [event.target.name]: result,
    }));
  };

  function validateForm() {
    let errors = {};
    if (!values.Name) {
      errors.Name = "Name is required";
    }
    if (!values.Description) {
      errors.Description = "Description is required";
    }
    if (!values.Effects) {
      errors.Effects = "Effect is required";
    }
    if (!values.KeyAttribute) {
      errors.KeyAttribute = "Key Attribute is required";
    }
    if (values.MinValue < 0 || values.MinValue > 20) {
      errors.MinValue = "Allowed input: from 0 to 20";
    }
    if (values.MinValue < 0 || values.MinValue > 20) {
      errors.ManaCost = "Allowed input: from 0 to 20";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  }

  function handleSubmit(event) {
    console.log(event);
    if (event) event.preventDefault();
    if (validateForm(values)) {
      console.log("udalo sb");
      createSpellFn({
        uId: auth.uId,
        name: values.Name,
        isPublic: values.IsPublic,
        language: "en", //tymczasowo
        description: values.Description,
        keyAttribute: values.KeyAttribute,
        minValue: values.MinValue,
        manaCost: values.ManaCost,
        effects: values.Effects,
      })
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "Your custom spell was added successfully!",
            width: 450,
            padding: "3em",
            color: "#716add",
            imageUrl: successfulGif,
            imageWidth: "100%",
            imageHeight: "100%",
            imageAlt: "success image",
            backdrop: `rgba(0,0,123,0.4)`,
          });
          navigate("/assets");
        })
        .catch((e) => {
          console.log("oops");
          console.log(e);
        });
    }
  }

  return (
    <Box sx={{ mb: 10, display: "flex", justifyContent: "center" }}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { width: "100%" },

          display: "flex",
          flexDirection: "column",
          gap: 3,
          px: 2,
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormControl sx={{ mt: 1 }}>
          <InputLabel>Name*</InputLabel>
          <Input
            id="Name"
            name="Name"
            aria-describedby="my-helper-text"
            inputProps={{ maxLength: 40 }}
            onChange={handleChange}
            value={values.Name}
          />
          {formErrors.Name && <p className="text-warning">{formErrors.Name}</p>}
        </FormControl>

        <FormControl>
          <TextField
            id="Effects"
            name="Effects"
            label="Effects*"
            multiline
            rows={5}
            inputProps={{ maxLength: 280 }}
            onChange={handleChange}
            value={values.Effects}
          />
          {formErrors.Effects && (
            <p className="text-warning">{formErrors.Effects}</p>
          )}
        </FormControl>

        <FormControl>
          <TextField
            id="Description"
            name="Description"
            label="Description*"
            multiline
            rows={5}
            inputProps={{ maxLength: 280 }}
            onChange={handleChange}
            value={values.Description}
          />
          {formErrors.Description && (
            <p className="text-warning">{formErrors.Description}</p>
          )}
        </FormControl>

        <FormControl>
          <TextField
            select
            id="KeyAttribute"
            name="KeyAttribute"
            label="Crucial attribute*"
            value={values.KeyAttribute}
            onChange={handleChange}
            helperText="Choose the crucial attribute when casting this spell"
            variant="standard"
          >
            {attributes
              .filter(
                (attr) =>
                  attr.value === "charisma" || attr.value === "intelligence"
              )
              .map((attr) => (
                <MenuItem
                  key={attr.label}
                  attr={attr.value}
                  value={attr.value}
                >
                  {attr.label}
                </MenuItem>
              ))}
          </TextField>
          {formErrors.KeyAttribute && (
            <p className="text-warning">{formErrors.KeyAttribute}</p>
          )}
        </FormControl>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <FormControl sx={{ my: 2 }}>
              <InputLabel>Minimal value for crucial skill</InputLabel>
              <Input
                id="MinValue"
                name="MinValue"
                aria-describedby="my-helper-text"
                inputProps={{ maxLength: 2 }}
                onChange={handleNumberChange}
                value={values.MinValue}
              />
              {formErrors.MinValue && (
                <p className="text-warning">{formErrors.MinValue}</p>
              )}
            </FormControl>
            <ButtonGroup size="small" orientation="vertical">
              <IconButton onClick={handleIncrement} id="MinValue">
                <KeyboardArrowUpIcon />
              </IconButton>
              <IconButton onClick={handleDecrement} id="MinValue">
                <KeyboardArrowDownIcon />
              </IconButton>
            </ButtonGroup>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <FormControl sx={{ my: 2 }}>
              <InputLabel>Mana cost</InputLabel>
              <Input
                id="ManaCost"
                name="ManaCost"
                aria-describedby="my-helper-text"
                inputProps={{ maxLength: 2 }}
                onChange={handleNumberChange}
                value={values.ManaCost}
              />
              {formErrors.ManaCost && (
                <p className="text-warning">{formErrors.ManaCost}</p>
              )}
            </FormControl>
            <ButtonGroup size="small" orientation="vertical">
              <IconButton onClick={handleIncrement} id="ManaCost">
                <KeyboardArrowUpIcon />
              </IconButton>
              <IconButton onClick={handleDecrement} id="ManaCost">
                <KeyboardArrowDownIcon />
              </IconButton>
            </ButtonGroup>
          </Box>
        </Box>

        <Box sx={{ py: 1 }}>
          <Typography variant="label">Make this asset public?</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="label" sx={{ fontSize: "small", mr: 3 }}>
              Private
            </Typography>
            <FormControl>
              <FormControlLabel
                control={
                  <Switch
                    id="IsPublic"
                    name="IsPublic"
                    onChange={handleCheck}
                    value={values.IsPublic}
                    defaultChecked
                  />
                }
              />
              {formErrors.IsPublic && (
                <p className="text-warning">{formErrors.IsPublic}</p>
              )}
            </FormControl>
            <Typography variant="label" sx={{ fontSize: "small" }}>
              Public
            </Typography>
          </Stack>
        </Box>

        {/* <FormControl>
          <TextField
            select
            type={"bool"}
            id="IsPublic"
            name="IsPublic"
            label="IsPublic"
            value={values.IsPublic}
            onChange={handleChange}
            helperText="Choose whether you want this spell to be public or private"
            variant="standard"
          >
            {availabilities.map((availability) => (
              <MenuItem key={availability.label} value={availability.value}>
                {availability.label}
              </MenuItem>
            ))}
          </TextField>
          {formErrors.IsPublic && (
            <p className="text-warning">{formErrors.IsPublic}</p>
          )}
        </FormControl> */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            my: 4,
          }}
        >
          <Button
            onClick={() => navigate("/assets")}
            variant="contained"
            startIcon={<ArrowBackIosIcon />}
            sx={{ width: "30%" }}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            endIcon={<ArrowForwardIosIcon />}
            sx={{ width: "30%" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
