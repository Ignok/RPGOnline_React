import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import HelperTooltip from "../../../../helpers/pop-ups/helperTooltip";
import ClearIcon from "@mui/icons-material/Clear";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { useAsyncFn } from "../../../../hooks/useAsync";
import { getSpellsForCharacter } from "../../../../services/assets";

const columns = [
  { field: "prefferedLanguage", headerName: "Language", maxWidth: 90, flex: 1 },
  {
    field: "name",
    headerName: "Name",
    minWidth: 90,
    maxWidth: 130,
    flex: 1,
    fontWeight: "bold",
  },
  { field: "effects", headerName: "Effect", minWidth: 250, flex: 1 },
  {
    field: "description",
    headerName: "Description",
    minWidth: 300,
    flex: 1,
  },
  {
    field: "keyAttribute",
    headerName: "Key attribute",
    maxWidth: 120,
    minWidth: 100,
    flex: 1,
  },
  {
    field: "minValue",
    headerName: "Min. value",
    type: "number",
    maxWidth: 90,
    minWidth: 60,
    flex: 1,
  },
  {
    field: "manaCost",
    headerName: "Mana cost",
    type: "number",
    maxWidth: 90,
    flex: 1,
  },
  {
    field: "isSaved",
    headerName: "Saved",
    type: "boolean",
    maxWidth: 60,
    flex: 1,
  },
];

const maxSpells = 3;

export default function SpellDataTable({ uId, handleSpellSelect }) {
  const [data, setData] = useState();

  const {
    loading,
    error,
    execute: getSpellsForCharacterFn,
  } = useAsyncFn(getSpellsForCharacter);

  useEffect(() => {
    getSpellsForCharacterFn({ uId })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
      });
  }, []);

  const [isWarning, setIsWarning] = useState(false);

  const [select, setSelect] = useState([]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          width: "100%",
        }}
      >
        <Box>
          <FormLabel sx={{ mb: 2 }}>
            Choose up to {maxSpells} starting spells for this profession
          </FormLabel>
          <HelperTooltip
            text={`For spellcasting professions (sorcerer, mage, priest etc.), you can choose up to ${maxSpells} starting spells`}
          />
        </Box>
        {isWarning && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={isWarning}
            autoHideDuration={30}
          >
            <Alert severity="error" sx={{boxShadow: 2}}>
              You can choose a maximum of {maxSpells} spells!
            </Alert>
          </Snackbar>
        )}
        <Button
          endIcon={<ClearIcon />}
          onClick={(e) => {
            setIsWarning(false);
            handleSpellSelect(0, "");
            setSelect([]);
          }}
        >
          Reset Choice
        </Button>
      </Box>
      <Box style={{ height: 550, width: "100%" }}>
        {loading ? (
          <h5>loading...</h5>
        ) : data?.length ? (
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.spellId}
            pageSize={10}
            rowsPerPageOptions={[10]}
            onSelectionModelChange={(e) => {
              const selectedSpells = data.filter((d) => e.includes(d.spellId));
              if (selectedSpells.length > maxSpells) {
                setIsWarning(true);
              } else {
                setIsWarning(false);
                handleSpellSelect(e, selectedSpells);
                setSelect(e);
              }
            }}
            selectionModel={select}
            hideFooterSelectedRowCount
            checkboxSelection
            getRowHeight={() => "auto"}
            getEstimatedRowHeight={() => 200}
            sx={{
              "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
                py: "8px",
              },
              "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
                py: "15px",
              },
              "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
                py: "22px",
              },
              ".MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold !important",
                overflow: "visible !important",
              },
            }}
          />
        ) : (
          <h5>Sorry, no available spells!</h5>
        )}
      </Box>
    </Box>
  );
}
