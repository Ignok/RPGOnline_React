import React, { useState, useEffect, useRef } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Stack } from "@mui/material";

import Icon from "@mui/material/Icon";

import { useAsyncFn } from "../../../../hooks/useAsync";
import { characterAttributes } from "../../../../helpers/enums/assets";
import { getRandomAttributes } from "../../../../services/assets";

export default function GenerateAttributes({handleAttributesChange}) {
  const { execute: getRandomAttributesFn } = useAsyncFn(getRandomAttributes);
  const [value, setValue] = useState("");

  const [checked, setChecked] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if(value !== ""){
      handleAttributesChange(value);
    }
  }, [value]);

  async function onGeneratevalue() {
    setChecked((prev) => (prev === false ? prev : !prev));
    await getRandomAttributesFn()
      .then((res) => {
        setValue(res);
        setChecked((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
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
        ref={containerRef}
        sx={{
          overflow: "hidden",
          width: "100%",
        }}
      >
        <FormLabel sx={{ mb: 1, textTransform: "capitalize" }}>
          Attributes
        </FormLabel>

        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {characterAttributes?.map(({ label, column }) => {
            return (
              <Box
                key={label}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  mr: 3,
                }}
              >
                <Box>
                  <Typography
                    variant="overline"
                    color="text.primary"
                    key={label}
                    sx={{
                      fontWeight: "light",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </Typography>
                </Box>

                <Box>
                  <Slide
                    direction="up"
                    in={checked}
                    container={containerRef.current}
                  >
                    <Typography
                      variant="body2"
                      color="text.primary"
                      key={column}
                      sx={{
                        fontWeight: "light",
                        mt: 1,
                        ml: 1,
                      }}
                    >
                      {value[`${column}`] ?? 0}
                    </Typography>
                  </Slide>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
