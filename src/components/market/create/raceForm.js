import React, { useState } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  TextField,
  MenuItem,
  Link,
} from "@mui/material";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import successfulGif from "../../../helpers/pictures/post_added_successfully.gif";
import useAuth from "../../../hooks/useAuth";

import { createRace } from "../../../services/assets";
import { useAsyncFn } from "../../../hooks/useAsync";

import { attributes } from "../../../helpers/enums/attributes";


export default function RaceForm() {
  const { auth } = useAuth();
  const [values, setValues] = useState({
    Name: "",
    Description: "",
    KeyAttribute: "",
    Talent: "",
    HiddenTalent: "",
    IsPublic: true,
  });

  const { execute: createRaceFn } = useAsyncFn(createRace);

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

  function validateForm() {
    let errors = {};
    if (!values.Name) {
      errors.Name = "Name is required";
    }
    if (!values.Description) {
      errors.Description = "Description is required";
    }
    if (!values.KeyAttribute) {
      errors.KeyAttribute = "KeyAttribute is required";
    }
    if (!values.Talent) {
      errors.Talent = "Talent is required";
    } else if (values.Talent.length < 5) {
      errors.Talent = "Talent description is too short";
    }
    if (!values.HiddenTalent) {
      errors.HiddenTalent = "Hidden talent is required";
    } else if (values.HiddenTalent.length < 5) {
      errors.Talent = "Hidden Talent description is too short";
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
      createRaceFn({
        uId: auth.uId,
        name: values.Name,
        isPublic: values.IsPublic,
        language: "en", //tymczasowo
        description: values.Description,
        keyAttribute: values.KeyAttribute,
        talent: values.Talent,
        hiddenTalent: values.HiddenTalent,
      })
        .then((res) => {
          Swal.fire({
            title: "Your custom race was added successfully!",
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
          width: "50%",
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
            id="Talent"
            name="Talent"
            label="Talent*"
            multiline
            rows={5}
            inputProps={{ maxLength: 280 }}
            onChange={handleChange}
            value={values.Talent}
          />
          {formErrors.Talent && (
            <p className="text-warning">{formErrors.Talent}</p>
          )}
        </FormControl>

        <FormControl>
          <TextField
            id="HiddenTalent"
            name="HiddenTalent"
            label="Hidden talent*"
            multiline
            rows={5}
            inputProps={{ maxLength: 280 }}
            onChange={handleChange}
            value={values.HiddenTalent}
          />
          {formErrors.HiddenTalent && (
            <p className="text-warning">{formErrors.HiddenTalent}</p>
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
            helperText="Choose which attribute assigns this race"
            variant="standard"
          >
            {attributes.map((attr) => (
              <MenuItem key={attr.label} attr={attr.value} value={attr.value}>
                {attr.label}
              </MenuItem>
            ))}
          </TextField>
          {formErrors.KeyAttribute && (
            <p className="text-warning">{formErrors.KeyAttribute}</p>
          )}
        </FormControl>

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
