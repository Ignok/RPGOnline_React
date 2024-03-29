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
import successfulGif from "../../../helpers/pictures/post_added_successfully.gif";
import useAuth from "../../../hooks/useAuth";
import SpellDataTable from "./equipment/selectSpell";
import ItemDataTable from "./equipment/selectItem";
import { createProfession } from "../../../services/assets";
import { useAsyncFn } from "../../../hooks/useAsync";
import { attributes } from "../../../helpers/enums/attributes";

const minValueInput = -6;
const maxValueInput = 6;

export default function ProfessionForm() {
  const { auth } = useAuth();
  const [values, setValues] = useState({
    Name: "",
    Description: "",
    KeyAttribute: "",
    Talent: "",
    HiddenTalent: "",
    WeaponMod: 0,
    ArmorMod: 0,
    GadgetMod: 0,
    CompanionMod: 0,
    PsycheMod: 0,
    IsPublic: true,
    Language: "en",
    SpellId: 0,
    ItemId: 0,
  });

  const { execute: createProfessionFn } = useAsyncFn(createProfession);

  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const [spellName, setSpellName] = useState("");
  function handleSpellSelect(e, selectedSpells) {
    let spellName = "";
    if (selectedSpells !== "") {
      selectedSpells.forEach((element) => {
        spellName === ""
          ? (spellName += element.name)
          : (spellName += ", " + element.name);
      });
    }
    setSpellName(spellName);
    setValues((values) => ({
      ...values,
      ["SpellId"]: e,
    }));
  }

  const [itemName, setItemName] = useState("");
  function handleItemSelect(e, selectedItems) {
    let itemName = "";
    if (selectedItems !== "") {
      selectedItems.forEach((element) => {
        itemName === ""
          ? (itemName += element.name)
          : (itemName += ", " + element.name);
      });
    }
    setItemName(itemName);
    setValues((values) => ({
      ...values,
      ["ItemId"]: e,
    }));
  }

  const handleCheck = (event) => {
    const value = event.target.checked;
    setValues((values) => ({
      ...values,
      [event.target.name]: value,
    }));
  };

  const [counter, setCounter] = useState({
    WeaponMod: 0,
    ArmorMod: 0,
    GadgetMod: 0,
    CompanionMod: 0,
    PsycheMod: 0,
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
    } else if (values.Description.length < 5) {
      errors.Talent = "Description is too short";
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
    if (!values.KeyAttribute) {
      errors.KeyAttribute = "Key Attribute is required";
    }
    if (values.WeaponMod < minValueInput || values.WeaponMod > maxValueInput) {
      errors.WeaponMod = `Allowed input: from ${minValueInput} to ${maxValueInput}`;
    }
    if (values.ArmorMod < minValueInput || values.ArmorMod > maxValueInput) {
      errors.ArmorMod = `Allowed input: from ${minValueInput} to ${maxValueInput}`;
    }
    if (values.GadgetMod < minValueInput || values.GadgetMod > maxValueInput) {
      errors.GadgetMod = `Allowed input: from ${minValueInput} to ${maxValueInput}`;
    }
    if (values.CompanionMod < minValueInput || values.CompanionMod > maxValueInput) {
      errors.CompanionMod = `Allowed input: from ${minValueInput} to ${maxValueInput}`;
    }
    if (values.PsycheMod < minValueInput || values.PsycheMod > maxValueInput) {
      errors.PsycheMod = `Allowed input: from ${minValueInput} to ${maxValueInput}`;
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
      createProfessionFn({
        uId: auth.uId,
        name: values.Name,
        isPublic: values.IsPublic,
        language: values.Language,
        description: values.Description,
        talent: values.Talent,
        hiddenTalent: values.HiddenTalent,
        keyAttribute: values.KeyAttribute,
        //keyAttribute: values.KeyAttribute,
        weaponMod: values.WeaponMod,
        armorMod: values.ArmorMod,
        gadgetMod: values.GadgetMod,
        companionMod: values.CompanionMod,
        psycheMod: values.PsycheMod,
        spellId: values.SpellId,
        itemId: values.ItemId,
      })
        .then((res) => {
          Swal.fire({
            title: "Your custom profession was added successfully!",
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
            helperText="Choose which attribute assigns this profession"
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

        <Box sx={{ mt: 2 }}>
          <FormLabel>Proficiency modifiers:</FormLabel>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <FormControl sx={{ my: 2 }}>
                <InputLabel>Weapon</InputLabel>
                <Input
                  id="WeaponMod"
                  name="WeaponMod"
                  inputProps={{ maxLength: 2 }}
                  onChange={handleNumberChange}
                  value={values.WeaponMod}
                />
                {formErrors.WeaponMod && (
                  <p className="text-warning">{formErrors.WeaponMod}</p>
                )}
              </FormControl>
              <ButtonGroup size="small" orientation="vertical">
                <IconButton onClick={handleIncrement} id="WeaponMod">
                  <KeyboardArrowUpIcon />
                </IconButton>
                <IconButton onClick={handleDecrement} id="WeaponMod">
                  <KeyboardArrowDownIcon />
                </IconButton>
              </ButtonGroup>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <FormControl sx={{ my: 2 }}>
                <InputLabel>Armor</InputLabel>
                <Input
                  id="ArmorMod"
                  name="ArmorMod"
                  inputProps={{ maxLength: 2 }}
                  onChange={handleNumberChange}
                  value={values.ArmorMod}
                />
                {formErrors.ArmorMod && (
                  <p className="text-warning">{formErrors.ArmorMod}</p>
                )}
              </FormControl>
              <ButtonGroup size="small" orientation="vertical">
                <IconButton onClick={handleIncrement} id="ArmorMod">
                  <KeyboardArrowUpIcon />
                </IconButton>
                <IconButton onClick={handleDecrement} id="ArmorMod">
                  <KeyboardArrowDownIcon />
                </IconButton>
              </ButtonGroup>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <FormControl sx={{ my: 2 }}>
                <InputLabel>Gadget</InputLabel>
                <Input
                  id="GadgetMod"
                  name="GadgetMod"
                  inputProps={{ maxLength: 2 }}
                  onChange={handleNumberChange}
                  value={values.GadgetMod}
                />
                {formErrors.GadgetMod && (
                  <p className="text-warning">{formErrors.GadgetMod}</p>
                )}
              </FormControl>
              <ButtonGroup size="small" orientation="vertical">
                <IconButton onClick={handleIncrement} id="GadgetMod">
                  <KeyboardArrowUpIcon />
                </IconButton>
                <IconButton onClick={handleDecrement} id="GadgetMod">
                  <KeyboardArrowDownIcon />
                </IconButton>
              </ButtonGroup>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <FormControl sx={{ my: 2 }}>
                <InputLabel>Companion</InputLabel>
                <Input
                  id="CompanionMod"
                  name="CompanionMod"
                  inputProps={{ maxLength: 2 }}
                  onChange={handleNumberChange}
                  value={values.CompanionMod}
                />
                {formErrors.CompanionMod && (
                  <p className="text-warning">{formErrors.CompanionMod}</p>
                )}
              </FormControl>
              <ButtonGroup size="small" orientation="vertical">
                <IconButton onClick={handleIncrement} id="CompanionMod">
                  <KeyboardArrowUpIcon />
                </IconButton>
                <IconButton onClick={handleDecrement} id="CompanionMod">
                  <KeyboardArrowDownIcon />
                </IconButton>
              </ButtonGroup>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <FormControl sx={{ my: 2 }}>
                <InputLabel>Psyche</InputLabel>
                <Input
                  id="PsycheMod"
                  name="PsycheMod"
                  inputProps={{ maxLength: 2 }}
                  onChange={handleNumberChange}
                  value={values.PsycheMod}
                />
                {formErrors.PsycheMod && (
                  <p className="text-warning">{formErrors.PsycheMod}</p>
                )}
              </FormControl>
              <ButtonGroup size="small" orientation="vertical">
                <IconButton onClick={handleIncrement} id="PsycheMod">
                  <KeyboardArrowUpIcon />
                </IconButton>
                <IconButton onClick={handleDecrement} id="PsycheMod">
                  <KeyboardArrowDownIcon />
                </IconButton>
              </ButtonGroup>
            </Box>
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

        <Box sx={{ my: 1 }}>
          <ItemDataTable uId={auth.uId} handleItemSelect={handleItemSelect} />
          <FormLabel sx={{ mt: 1 }}>
            {itemName === "" || itemName === "undefined"
              ? ""
              : `You have chosen items: ${itemName}`}
          </FormLabel>
        </Box>

        <Box sx={{ my: 1 }}>
          <SpellDataTable
            uId={auth.uId}
            handleSpellSelect={handleSpellSelect}
          />
          <FormLabel sx={{ mt: 1 }}>
            {spellName === "" || spellName === "undefined"
              ? ""
              : `You have chosen spells: ${spellName}`}
          </FormLabel>
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
