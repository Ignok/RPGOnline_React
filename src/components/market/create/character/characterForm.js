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
import Stack from "@mui/material/Stack";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";

import successfulGif from "../../../../helpers/pictures/post_added_successfully.gif";
import useAuth from "../../../../hooks/useAuth";
import HelperTooltip from "../../../../helpers/pop-ups/helperTooltip";

import ClearIcon from "@mui/icons-material/Clear";

import SpellDataTable from "../equipment/selectSpell";
import ItemDataTable from "../equipment/selectItem";

import { createCharacter } from "../../../../services/assets";
import { useAsyncFn } from "../../../../hooks/useAsync";

import { attributes } from "../../../../helpers/enums/attributes";

import GenerateLore from "./generateLore";
import GenerateAttributes from "./generateAttributes";

export default function CharacterForm() {
  const { auth } = useAuth();
  const [values, setValues] = useState({
    Name: "",
    Description: "",
    Gold: 0,
    IsPublic: true,
    Language: "en",
    JsonReq: "",
    RaceId: 0,
    ProfessionId: 0,
  });

  const { execute: createCharacterFn } = useAsyncFn(createCharacter);

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
    console.log(event.target.checked);
    setValues((values) => ({
      ...values,
      [event.target.name]: value,
    }));
  };

  const [raceName, setRaceName] = useState("");
  function handleRaceSelect(e, raceName) {
    setRaceName(raceName);
    setValues((values) => ({
      ...values,
      ["RaceId"]: e,
    }));
  }

  const [professionName, setProfessionName] = useState("");
  function handleProfessionSelect(e, professionName) {
    setProfessionName(professionName);
    setValues((values) => ({
      ...values,
      ["ProfessionId"]: e,
    }));
  }
  
  function validateForm() {
    let errors = {};
    if (!values.Name) {
      errors.Name = "Name is required";
    }
    if (!values.Description) {
      errors.Description = "Description is required";
    } else if (values.Description.length < 5) {
      errors.Talent = "Description is too short";
    }
    if (values.ProfessionId === 0) {
      errors.ProfessionId = "Profession is required";
    }
    if (values.RaceId === 0) {
      errors.RaceId = "Race is required";
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
      createCharacterFn({
        uId: auth.uId,
        name: values.Name,
        isPublic: values.IsPublic,
        language: values.Language,
        description: values.Description,
        gold: 0, //bo playable postać
        jsonReq: values.JsonReq,
        raceId: values.RaceId,
        professionId: values.ProfessionId,
        //+ type
      })
        .then((res) => {
          Swal.fire({
            title: "Your new character was added successfully!",
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
    <Box
      sx={{
        mb: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { width: "100%" },

          display: "flex",
          flexDirection: "column",
          width: "70%",
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

        <GenerateLore type="characteristics" />
        <GenerateLore type="motivation" />
        <GenerateAttributes />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: 4,
            gap: 8,
          }}
        >
          <Box>
            <Button
              variant="outlined"
              endIcon={<AddIcon />}
              size="large"
              sx={{fontWeight: 'bold', width: 300}}
            >
              Choose Race
            </Button>
            <FormLabel sx={{ mt: 1 }}>
              { raceName === "" || raceName === "undefined"
                ? ""
                : `You have chosen spells: ${raceName}`}
            </FormLabel>
          </Box>

          <Box>
            <Button
              variant="outlined"
              endIcon={<AddIcon />}
              size="large"
              sx={{fontWeight: 'bold', width: 300}}
            >
              Choose Profession
            </Button>
            <FormLabel sx={{ mt: 1 }}>
              {professionName === "" || professionName === "undefined"
                ? ""
                : `You have chosen spells: ${professionName}`}
            </FormLabel>
          </Box>
        </Box>

        <Box sx={{ py: 1 }}>
          <FormLabel>Choose language</FormLabel>
          <RadioGroup
            row
            defaultValue="en"
            id="Language"
            name="Language"
            onChange={handleChange}
            value={values.Language}
          >
            <FormControlLabel value="en" control={<Radio />} label="English" />
            <FormControlLabel value="pl" control={<Radio />} label="Polish" />
          </RadioGroup>
        </Box>

        <Box sx={{ py: 1 }}>
          <FormLabel>Make this asset public?</FormLabel>
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
