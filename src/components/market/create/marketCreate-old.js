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

// import { createPost } from "../../../services/posts";
import { useAsyncFn } from "../../../hooks/useAsync";
import { item, profession, race, spell } from "../../../helpers/enums/assets";

function getCategory(cat) {
  switch (cat) {
    case "item":
      return item;
    case "profession":
      return profession;
    case "race":
      return race;
    case "spell":
      return spell;
  }
}

export default function CreateAsset() {
  const category = getCategory(useParams().category);
  const { auth } = useAuth();

  // const [values, setValues] = useState(
  //   (category.map(( {label, column} ) => ({label: column} )))
  // );

  const [values, setValues] = useState({
    Name: "",
    Description: "",
    Effect: "",
    Talent: "",
    HiddenTalent: "",
    KeySkill: "",
    KeyAttribute: "",
    MinValue: 0,
    MaxValue: 0,
    ManaCost: 0,
    WeaponMod: 0,
    ArmorMod: 0,
    GadgetMod: 0,
    CompanionMod: 0,
    PsycheMod: 0,
    SkillMod: 0,
    GoldMultiplier: 0,
  });

  //   const { execute: createPostFn } = useAsyncFn(createPost);

  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  //trochę tu sporo będzie
  function validateForm() {
    console.log("Validate the form....");

    let errors = {};

    if (!values.name) {
      errors.name = "Asset's name is required";
    }

    if (!values.description) {
      errors.description = "Description is required";
    }

    //censor bad words

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  }

  //   function handleSubmit(event) {
  //     if (event) event.preventDefault();
  //     if (validateForm(values)) {
  //       createPostFn({
  //         uId: auth.uId,
  //         title: values.Title,
  //         content: values.Content,
  //       })
  //         .then((res) => {
  //           console.log(res.data);
  //           Swal.fire({
  //             title: "Your asset was added successfully!",
  //             width: 450,
  //             padding: "3em",
  //             color: "#716add",
  //             imageUrl: successfulGif,
  //             imageWidth: "100%",
  //             imageHeight: "100%",
  //             imageAlt: "success image",
  //             backdrop: `rgba(0,0,123,0.4)`,
  //           });
  //           navigate("/forum");
  //         })
  //         .catch((e) => {
  //           console.log("oops");
  //           console.log(e);
  //         });
  //     }
  //   }

  return (
    <Box>
      <Button onClick={() => navigate("/assets")}>Back</Button>
      {console.log(values)}
      {/* <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "50vw" },

          display: "grid",
          justifyContent: "center",
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormControl>
          <InputLabel>Title</InputLabel>
          <Input
            id="Title"
            name="Title"
            aria-describedby="my-helper-text"
            inputProps={{ maxLength: 40 }}
            onChange={handleChange}
            value={values.Title}
          />
          {formErrors.Title && (
            <p className="text-warning">{formErrors.Title}</p>
          )}
        </FormControl>

        <FormControl>
          <TextField
            id="Content"
            name="Content"
            label="Content"
            multiline
            rows={10}
            inputProps={{ maxLength: 1080 }}
            onChange={handleChange}
            value={values.Content}
          />
          {formErrors.Content && (
            <p className="text-warning">{formErrors.Content}</p>
          )}
        </FormControl>

        <TextField
          select
          id="Tag"
          name="Tag"
          label="Tag"
          value={values.Tag}
          onChange={handleChange}
          helperText="Choose the tag that best fits your post"
          variant="standard"
        >
          {tags.map((tag) => (
            <MenuItem key={tag.value} value={tag.value}>
              {tag.label}
            </MenuItem>
          ))}
        </TextField>

        <Button type="submit">Submit</Button>
      </Box> */}
    </Box>
  );
}
