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

import { createItem } from "../../../services/assets";
import { useAsyncFn } from "../../../hooks/useAsync";

import { skills } from "../../../helpers/enums/skills";
import { availabilities } from "../../../helpers/enums/assets";

import { styled } from "@mui/material/styles";

const minValueInput = 0;

export default function SpellForm() {
  const { auth } = useAuth();
  const [values, setValues] = useState({
    Name: "",
    Description: "",
    KeySkill: "",
    SkillMod: 0,
    GoldMultiplier: 0,
    IsPublic: true,
  });

  const { execute: createItemFn } = useAsyncFn(createItem);

  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheck = (event) => {
    const value = event.target.checked;
    setValues((values) => ({
      ...values,
      [event.target.name]: value,
    }));
  };

  const [counter, setCounter] = useState({
    SkillMod: 0,
    GoldMultiplier: 0,
  });

  const handleIncrement = (event) => {
    const target = event.currentTarget.id;
    const tmp = counter[target];
    const maxValueInput = target === "GoldMultiplier" ? 100 : 6;
    const newCount = tmp + 1 >= maxValueInput ? maxValueInput : tmp + 1;
    setCounter((values) => ({
      ...values,
      [`${target}`]: newCount,
    }));
    setValues((values) => ({
      ...values,
      [target]: newCount,
    }));
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
    const maxValueInput = event.target.name === "GoldMultiplier" ? 100 : 20;
    const value = event.target.value.replace(/\D/g, "");
    const result = Math.max(
      minValueInput,
      Math.min(maxValueInput, Number(value))
    );
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
    if (!values.KeySkill) {
      errors.KeySkill = "KeySkill is required";
    }
    if (values.SkillMod < 0 || values.SkillMod > 6) {
      errors.MinValue = "Allowed input: from 0 to 6";
    }
    if (values.GoldMultiplier < 0 || values.GoldMultiplier > 100) {
      errors.ManaCost = "Allowed input: from 0 to 100";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  }

  function handleSubmit(event) {
    if (event) event.preventDefault();
    if (validateForm(values)) {
      createItemFn({
        uId: auth.uId,
        name: values.Name,
        isPublic: values.IsPublic,
        language: "en", //tymczasowo
        description: values.Description,
        keySkill: values.KeySkill,
        skillMod: values.SkillMod,
        goldMultiplier: values.GoldMultiplier,
      })
        .then((res) => {
          Swal.fire({
            title: "Your custom item was added successfully!",
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
            id="KeySkill"
            name="KeySkill"
            label="Crucial skill*"
            value={values.KeySkill}
            onChange={handleChange}
            helperText="Choose which skill is affected by this item"
            variant="standard"
          >
            {skills.map((skill) => (
              <MenuItem
                key={skill.label}
                skill={skill.value}
                value={skill.value}
              >
                {skill.label}
              </MenuItem>
            ))}
          </TextField>
          {formErrors.KeySkill && (
            <p className="text-warning">{formErrors.KeySkill}</p>
          )}
        </FormControl>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <FormControl sx={{ my: 2 }}>
              <InputLabel>Modifer for chosen skill</InputLabel>
              <Input
                id="SkillMod"
                name="SkillMod"
                aria-describedby="my-helper-text"
                inputProps={{ maxLength: 2 }}
                onChange={handleNumberChange}
                value={values.SkillMod}
              />
              {formErrors.SkillMod && (
                <p className="text-warning">{formErrors.SkillMod}</p>
              )}
            </FormControl>
            <ButtonGroup size="small" orientation="vertical">
              <IconButton onClick={handleIncrement} id="SkillMod">
                <KeyboardArrowUpIcon />
              </IconButton>
              <IconButton onClick={handleDecrement} id="SkillMod">
                <KeyboardArrowDownIcon />
              </IconButton>
            </ButtonGroup>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <FormControl sx={{ my: 2 }}>
              <InputLabel>Multiplier when selling</InputLabel>
              <Input
                id="GoldMultiplier"
                name="GoldMultiplier"
                aria-describedby="my-helper-text"
                inputProps={{ maxLength: 2 }}
                onChange={handleNumberChange}
                value={values.GoldMultiplier}
              />
              {formErrors.GoldMultiplier && (
                <p className="text-warning">{formErrors.GoldMultiplier}</p>
              )}
            </FormControl>
            <ButtonGroup size="small" orientation="vertical">
              <IconButton onClick={handleIncrement} id="GoldMultiplier">
                <KeyboardArrowUpIcon />
              </IconButton>
              <IconButton onClick={handleDecrement} id="GoldMultiplier">
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
