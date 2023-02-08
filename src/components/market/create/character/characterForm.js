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
import RaceDataTable from "./selectRace";
import ProfessionDataTable from "./selectProfession";

import { createCharacter } from "../../../../services/assets";
import { useAsyncFn } from "../../../../hooks/useAsync";

import { attributes } from "../../../../helpers/enums/attributes";
import { characterAttributes } from "../../../../helpers/enums/assets";

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
    RaceId: 0,
    ProfessionId: 0,
    JsonReq: {
      Motivation: "",
      Characteristics: "",
      Attributes: "",
      Skillset: null,
    }
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

  const [keyValueRace, setKeyValueRace] = useState("-");
  async function setMinAttr(attributes) {
    let minKey = "";
    let minVal = 20;
    for (const [key, value] of Object.entries(attributes)) {
      if (value < minVal) {
        minVal = value;
        minKey = key;
      } else if (value === minVal) {
        minKey += "-" + key;
      }
    }
    console.log("min " + minKey);
    return minKey;
    //setKeyValueRace(minKey);
  }

  const [keyValueProfession, setKeyValueProfession] = useState("-");
  async function setMaxAttr(attributes) {
    let maxKey = "";
    let maxVal = 0;
    for (const [key, value] of Object.entries(attributes)) {
      if (value > maxVal) {
        maxVal = value;
        maxKey = key;
      } else if (value === maxVal) {
        maxKey += "-" + key;
      }
    }
    console.log("max " + maxKey);
    return maxKey;
  }

  const handleMotivationChange = async (motivation) => {
    values.JsonReq.Motivation = motivation;
  }

  const handleCharacteristicsChange = async (characteristics) => {
    values.JsonReq.Characteristics = characteristics;
  }

  const handleAttributesChange = async (attributes) => {
    await setMinAttr(attributes).then((res) => {
      console.log(res);
      setKeyValueRace(res);
    });
    await setMaxAttr(attributes).then((res) => {
      console.log(res);
      setKeyValueProfession(res);
    });
    values.JsonReq.Attributes = attributes;
    handleRaceSelect("", 0);
    handleProfessionSelect("", 0);
  };

  const [openRaceTable, setOpenRaceTable] = useState(false);
  const handleRaceClose = () => {
    setOpenRaceTable(false);
  };

  const [raceName, setRaceName] = useState("");
  function handleRaceSelect(name, id) {
    setRaceName(name);
    setValues((values) => ({
      ...values,
      ["RaceId"]: id,
    }));
  }

  const [openProfessionTable, setOpenProfessionTable] = useState(false);
  const handleProfessionClose = () => {
    setOpenProfessionTable(false);
  };

  const [professionName, setProfessionName] = useState("");
  function handleProfessionSelect(name, id) {
    setProfessionName(name);
    setValues((values) => ({
      ...values,
      ["ProfessionId"]: id,
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
    if(!values.JsonReq.Attributes){
      errors.Attributes = "You have to roll for attribtues!";
    }
    if(!values.JsonReq.Motivation){
      errors.Motivation = "For playable characters motivation is required";
    }
    if(!values.JsonReq.Characteristics){
      errors.Characteristics = "For playable characters characteristics are required";
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

        <GenerateLore type="characteristics" handleChange={handleCharacteristicsChange}/>
        {formErrors.Characteristics && <p className="text-warning">{formErrors.Characteristics}</p>}

        <GenerateLore type="motivation" handleChange={handleMotivationChange}/>
        {formErrors.Motivation && <p className="text-warning">{formErrors.Motivation}</p>}

        <GenerateAttributes handleAttributesChange={handleAttributesChange} />
        {formErrors.Attributes && <p className="text-warning">{formErrors.Attributes}</p>}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 2,
            my: 4,
            gap: 8,
          }}
        >
          <Box sx={{ width: "60%", display: "flex", flexDirection: "column" }}>
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              size="large"
              sx={{ fontWeight: "bold" }}
              onClick={() => setOpenRaceTable(true)}
            >
              Choose Race
            </Button>
            {formErrors.RaceId && <p className="text-warning">{formErrors.RaceId}</p>}
            <FormLabel sx={{ mt: 1 }}>
              {raceName === "" || raceName === undefined
                ? ""
                : `You have chosen race: ${raceName}`}
            </FormLabel>
            {openRaceTable && (
              <RaceDataTable
                uId={auth.uId}
                handleRaceSelect={handleRaceSelect}
                keyValue={keyValueRace}
                open={true}
                handleRaceClose={handleRaceClose}
              />
            )}
          </Box>

          <Box sx={{ width: "60%", display: "flex", flexDirection: "column" }}>
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              size="large"
              sx={{ fontWeight: "bold" }}
              onClick={() => setOpenProfessionTable(true)}
            >
              Choose Profession
            </Button>
            {formErrors.ProfessionId && <p className="text-warning">{formErrors.ProfessionId}</p>}
            <FormLabel sx={{ mt: 1 }}>
              {professionName === "" || professionName === undefined
                ? ""
                : `You have chosen profession: ${professionName}`}
            </FormLabel>
            {openProfessionTable && (
              <ProfessionDataTable
                uId={auth.uId}
                handleProfessionSelect={handleProfessionSelect}
                keyValue={keyValueProfession}
                open={true}
                handleProfessionClose={handleProfessionClose}
              />
            )}
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
