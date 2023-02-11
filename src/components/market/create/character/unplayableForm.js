import React, { useState } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import successfulGif from "../../../../helpers/pictures/post_added_successfully.gif";
import useAuth from "../../../../hooks/useAuth";
import RaceDataTable from "./selectors/selectRace";
import ProfessionDataTable from "./selectors/selectProfession";
import NumberInput from "../numberInput";
import { createCharacter } from "../../../../services/assets";
import { useAsyncFn } from "../../../../hooks/useAsync";
import GenerateLore from "./generators/generateLore";
import { Success } from "../../../../helpers/pop-ups/success";

const minAttrInput = 0;
const maxAttrInput = 20;
const minSkillInput = -6;
const maxSkillInput = 6;

export default function UnplayableForm({ type }) {
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
      Motivation: null,
      Characteristics: null,
      Attributes: {
        Strength: 0,
        Dexterity: 0,
        Intelligence: 0,
        Charisma: 0,
        Health: 0,
        Mana: 0,
      },
      Skillset: {
        Weapon: 0,
        Armor: 0,
        Gadget: 0,
        Companion: 0,
        Psyche: 0,
      },
    },
    Type: type,
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
    return minKey;
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
    return maxKey;
  }

  const handleMotivationChange = async (motivation) => {
    values.JsonReq.Motivation = motivation;
  };

  const handleCharacteristicsChange = async (characteristics) => {
    values.JsonReq.Characteristics = characteristics;
  };

  const handleAttributesChange = async (attributes) => {
    await setMinAttr(attributes).then((res) => {
      setKeyValueRace(res);
    });
    await setMaxAttr(attributes).then((res) => {
      setKeyValueProfession(res);
    });
    values.JsonReq.Attributes = attributes;
    handleRaceSelect("", 0);
    handleProfessionSelect("", 0);
  };

  const [counter, setCounter] = useState({
    Strength: 0,
    Dexterity: 0,
    Intelligence: 0,
    Charisma: 0,
    Health: 0,
    Mana: 0,
    Gold: 0,
    Weapon: 0,
    Armor: 0,
    Gadget: 0,
    Companion: 0,
    Psyche: 0,
  });

  const handleIncrement = (event) => {
    const target = event.currentTarget.id;
    const tmp = counter[target];
    let newCount = 0;
    if (target === "Gold") {
      let maxImput = 100;
      newCount = tmp + 1 >= maxImput ? maxImput : tmp + 1;
      values.Gold = newCount;
    } else if (target in values.JsonReq.Attributes) {
      newCount = tmp + 1 >= maxAttrInput ? maxAttrInput : tmp + 1;
      values.JsonReq.Attributes[`${target}`] = newCount;
      handleAttributesChange(values.JsonReq.Attributes);
    } else if (target in values.JsonReq.Skillset) {
      newCount = tmp + 1 >= maxSkillInput ? maxSkillInput : tmp + 1;
      values.JsonReq.Skillset[`${target}`] = newCount;
    }
    setCounter((values) => ({
      ...values,
      [`${target}`]: newCount,
    }));
  };

  const handleDecrement = (event) => {
    const target = event.currentTarget.id;
    const tmp = counter[target];
    let newCount = 0;
    if (target === "Gold") {
      newCount = tmp - 1 <= 0 ? 0 : tmp - 1;
      values.Gold = newCount;
    } else if (target in values.JsonReq.Attributes) {
      newCount = tmp - 1 <= minAttrInput ? minAttrInput : tmp - 1;
      values.JsonReq.Attributes[`${target}`] = newCount;
      handleAttributesChange(values.JsonReq.Attributes);
    } else if (target in values.JsonReq.Skillset) {
      newCount = tmp - 1 <= minSkillInput ? minSkillInput : tmp - 1;
      values.JsonReq.Skillset[`${target}`] = newCount;
    }
    setCounter((values) => ({
      ...values,
      [`${target}`]: newCount,
    }));
  };

  const handleNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const target = event.currentTarget.id;
    const result = Math.max(
      minAttrInput,
      target === "Gold"
        ? Math.min(100, Number(value))
        : Math.min(maxAttrInput, Number(value))
    );
    if (target === "Gold") {
      values.Gold = result;
    } else if (target in values.JsonReq.Attributes) {
      values.JsonReq.Attributes[`${target}`] = result;
      handleAttributesChange(values.JsonReq.Attributes);
    } else if (target in values.JsonReq.Skillset) {
      values.JsonReq.Skillset[`${target}`] = result;
    }
    setCounter((values) => ({
      ...values,
      [`${event.target.name}`]: result,
    }));
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
    if (
      values.JsonReq.Attributes.Strength < minAttrInput ||
      values.JsonReq.Attributes.Strength > maxAttrInput
    ) {
      errors.Strength = `Allowed input: from ${minAttrInput} to ${maxAttrInput}`;
    }
    if (
      values.JsonReq.Attributes.Dexterity < minAttrInput ||
      values.JsonReq.Attributes.Dexterity > maxAttrInput
    ) {
      errors.Dexterity = `Allowed input: from ${minAttrInput} to ${maxAttrInput}`;
    }
    if (
      values.JsonReq.Attributes.Intelligence < minAttrInput ||
      values.JsonReq.Attributes.Intelligence > maxAttrInput
    ) {
      errors.Intelligence = `Allowed input: from ${minAttrInput} to ${maxAttrInput}`;
    }
    if (
      values.JsonReq.Attributes.Charisma < minAttrInput ||
      values.JsonReq.Attributes.Charisma > maxAttrInput
    ) {
      errors.Charisma = `Allowed input: from ${minAttrInput} to ${maxAttrInput}`;
    }
    if (
      values.JsonReq.Attributes.Health < minAttrInput ||
      values.JsonReq.Attributes.Health > maxAttrInput
    ) {
      errors.Health = `Allowed input: from ${minAttrInput} to ${maxAttrInput}`;
    }
    if (
      values.JsonReq.Attributes.Mana < minAttrInput ||
      values.JsonReq.Attributes.Mana > maxAttrInput
    ) {
      errors.Mana = `Allowed input: from ${minAttrInput} to ${maxAttrInput}`;
    }
    if (values.Gold < minAttrInput || values.Gold > 100) {
      errors.Gold = `Allowed input: from ${minAttrInput} to 100`;
    }
    if (
      values.JsonReq.Skillset.Weapon < minSkillInput ||
      values.JsonReq.Skillset.Weapon > maxSkillInput
    ) {
      errors.Weapon = `Allowed input: from ${minSkillInput} to ${maxSkillInput}`;
    }
    if (
      values.JsonReq.Skillset.Armor < minSkillInput ||
      values.JsonReq.Skillset.Armor > maxSkillInput
    ) {
      errors.Armor = `Allowed input: from ${minSkillInput} to ${maxSkillInput}`;
    }
    if (
      values.JsonReq.Skillset.Gadget < minSkillInput ||
      values.JsonReq.Skillset.Gadget > maxSkillInput
    ) {
      errors.Gadget = `Allowed input: from ${minSkillInput} to ${maxSkillInput}`;
    }
    if (
      values.JsonReq.Skillset.Companion < minSkillInput ||
      values.JsonReq.Skillset.Companion > maxSkillInput
    ) {
      errors.Companion = `Allowed input: from ${minSkillInput} to ${maxSkillInput}`;
    }
    if (
      values.JsonReq.Skillset.Psyche < minSkillInput ||
      values.JsonReq.Skillset.Psyche > maxSkillInput
    ) {
      errors.Psyche = `Allowed input: from ${minSkillInput} to ${maxSkillInput}`;
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
        gold: values.Gold,
        jsonReq: values.JsonReq,
        raceId: values.RaceId,
        professionId: values.ProfessionId,
        type: values.Type,
      })
        .then((res) => {
          Swal.fire({
            title: `Your new ${values.type} was added successfully!`,
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
          Success.fire({
            icon: "error",
            title: "Something went wrong with uploading",
          });
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

        <GenerateLore
          type="characteristics"
          handleChange={handleCharacteristicsChange}
        />
        <GenerateLore type="motivation" handleChange={handleMotivationChange} />

        <Box sx={{ mt: 2 }}>
          <FormLabel>Attributes:</FormLabel>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
            <NumberInput
              title={"Strength"}
              id={"Strength"}
              value={values?.JsonReq.Attributes.Strength}
              formErrors={formErrors.Strength}
              handleNumberChange={handleNumberChange}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
            <NumberInput
              title={"Dexterity"}
              id={"Dexterity"}
              value={values?.JsonReq.Attributes.Dexterity}
              formErrors={formErrors.Dexterity}
              handleNumberChange={handleNumberChange}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
            <NumberInput
              title={"Intelligence"}
              id={"Intelligence"}
              value={values?.JsonReq.Attributes.Intelligence}
              formErrors={formErrors.Intelligence}
              handleNumberChange={handleNumberChange}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
            <NumberInput
              title={"Charisma"}
              id={"Charisma"}
              value={values?.JsonReq.Attributes.Charisma}
              formErrors={formErrors.Charisma}
              handleNumberChange={handleNumberChange}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
            <NumberInput
              title={"Health"}
              id={"Health"}
              value={values?.JsonReq.Attributes.Health}
              formErrors={formErrors.Health}
              handleNumberChange={handleNumberChange}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
            <NumberInput
              title={"Mana"}
              id={"Mana"}
              value={values?.JsonReq.Attributes.Mana}
              formErrors={formErrors.Mana}
              handleNumberChange={handleNumberChange}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          </Box>
        </Box>

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
            {formErrors.RaceId && (
              <p className="text-warning">{formErrors.RaceId}</p>
            )}
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
            {formErrors.ProfessionId && (
              <p className="text-warning">{formErrors.ProfessionId}</p>
            )}
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

        <Box sx={{ mb: 2 }}>
          <FormLabel>Skillset</FormLabel>
          <Typography sx={{ fontSize: "small" }}>
            {
              "(caution: directly provided skillset will override skillset from profession)"
            }
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 3, mt: 1 }}>
            <NumberInput
              title={"Weapon"}
              id={"Weapon"}
              value={values?.JsonReq.Skillset.Weapon}
              formErrors={formErrors.Weapon}
              handleNumberChange={handleNumberChange}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
            <NumberInput
              title={"Armor"}
              id={"Armor"}
              value={values?.JsonReq.Skillset.Armor}
              formErrors={formErrors.Armor}
              handleNumberChange={handleNumberChange}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
            <NumberInput
              title={"Gadget"}
              id={"Gadget"}
              value={values?.JsonReq.Skillset.Gadget}
              formErrors={formErrors.Gadget}
              handleNumberChange={handleNumberChange}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
            <NumberInput
              title={"Companion"}
              id={"Companion"}
              value={values?.JsonReq.Skillset.Companion}
              formErrors={formErrors.Companion}
              handleNumberChange={handleNumberChange}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
            <NumberInput
              title={"Psyche"}
              id={"Psyche"}
              value={values?.JsonReq.Skillset.Psyche}
              formErrors={formErrors.Psyche}
              handleNumberChange={handleNumberChange}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
          </Box>
        </Box>

        <NumberInput
          title={"Gold"}
          id={"Gold"}
          value={values.Gold}
          formErrors={formErrors.Gold}
          handleNumberChange={handleNumberChange}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />

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
            onClick={() => {
              console.log(values);
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
