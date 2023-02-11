import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useAsyncFn } from "../../../../../hooks/useAsync";
import {
  getRandomMotivation,
  getRandomCharacteristics,
} from "../../../../../services/assets";
import {
  getMotivation,
  getCharacteristics,
} from "../../../../../helpers/functions/getLore";
import Icon from "@mui/material/Icon";
import { Success } from "../../../../../helpers/pop-ups/success";

function getFn(type) {
  switch (type) {
    case "motivation":
      return getRandomMotivation;
    case "characteristics":
      return getRandomCharacteristics;
  }
}

export default function GenerateLore({ type, handleChange }) {
  const { execute: getRandomFn } = useAsyncFn(getFn(type));
  const [value, setValue] = useState("");

  const [checked, setChecked] = useState(false);
  const containerRef = useRef(null);

  function onGeneratevalue() {
    setChecked((prev) => (prev === false ? prev : !prev));
    return getRandomFn()
      .then((res) => {
        setValue(res);
        handleChange(res);
        setChecked((prev) => !prev);
      })
      .catch((err) => {
        Success.fire({
          icon: "error",
          title: "Something went wrong with uploading",
        });
      });
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
      }}
    >
      <FormControlLabel
        control={
          <Tooltip title="Generate!">
            <IconButton
              aria-label="generate"
              onClick={onGeneratevalue}
              checked={checked}
              sx={{ mt: 3 }}
            >
              <Icon
                className="fa-solid fa-dice"
                sx={{ width: 30, height: 30 }}
              />
            </IconButton>
          </Tooltip>
        }
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box sx={{ width: "100%", mb: 2, height: "100%" }}>
          <FormLabel sx={{ mb: 1, textTransform: "capitalize" }}>
            {type}
          </FormLabel>
          <Box
            ref={containerRef}
            sx={{
              overflow: "hidden",
              border: 1,
              borderColor: "#bdbdbd",
              borderRadius: 2,
              width: "100%",
            }}
          >
            <Slide
              direction="right"
              in={checked}
              container={containerRef.current}
            >
              <Typography
                variant="body1"
                color="text.primary"
                key="value"
                sx={{
                  fontWeight: "light",
                  px: 2,
                  py: 2,
                }}
              >
                {type === "motivation"
                  ? getMotivation(value)
                  : type === "characteristics"
                  ? getCharacteristics(value)
                  : ""}
              </Typography>
            </Slide>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
