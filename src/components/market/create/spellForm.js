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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import successfulGif from "../../../helpers/pictures/post_added_successfully.gif";
import useAuth from "../../../hooks/useAuth";

import { createSpell } from "../../../services/assets";
import { useAsyncFn } from "../../../hooks/useAsync";
import { spell } from "../../../helpers/enums/assets";

//podac wszystkie i wydzielic osobno
const skills = [
  {
    value: "intelligence",
    label: "INTELLIGENCE",
  },
  {
    value: "charisma",
    label: "CHARISMA",
  },
];

const availabilities = [
  {
    value: true,
    label: "PUBLIC",
  },
  {
    value: false,
    label: "PRIVATE",
  },
];

const minValueInput = 0;
const maxValueInput = 20;

export default function SpellForm() {
  const { auth } = useAuth();
  const [values, setValues] = useState({
    Name: "",
    Description: "",
    Effects: "",
    KeySkill: "",
    MinValue: 0,
    ManaCost: 0,
    IsPublic: true
  });

  const { execute: createSpellFn } = useAsyncFn(createSpell);

  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const result = Math.max(minValueInput, Math.min(maxValueInput, Number(value)));
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
    if (!values.KeySkill) {
      errors.KeySkill = "KeySkill is required";
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
    if (event) event.preventDefault();
    if (validateForm(values)) {
      console.log("udalo sb")
      createSpellFn({
        uId: auth.uId,
        name: values.Name,
        isPublic: values.IsPublic,
        language: 'en', //tymczasowo
        description: values.Description,
        keySkill: values.KeySkill,
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
    <Box>
      <Button onClick={() => navigate("/assets")}>Back</Button>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "50vw" },

          display: "grid",
          justifyContent: "center",
          gap: 3,
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormControl>
          <InputLabel>Name</InputLabel>
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
            label="Effects"
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
            label="Description"
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
            label="KeySkill"
            value={values.KeySkill}
            onChange={handleChange}
            helperText="Choose the crucial skill when casting this spell"
            variant="standard"
          >
            {skills.map((skill) => (
              <MenuItem key={skill.label} skill={skill.value} value={skill.value}>
                {skill.label}
              </MenuItem>
            ))}

          </TextField>
          {formErrors.KeySkill && (
            <p className="text-warning">{formErrors.KeySkill}</p>
          )}
        </FormControl>


        {/* ale żeby było liczbowe */}
        <FormControl>
          <InputLabel>Minimal Value</InputLabel>
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

        <FormControl>
          <InputLabel>Mana Cost</InputLabel>
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

        <FormControl>
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
        </FormControl>

        <Button type="submit">Submit</Button>
      </Box>
    </Box>
  );
}
