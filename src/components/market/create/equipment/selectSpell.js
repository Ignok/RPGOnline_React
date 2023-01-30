import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";

import HelperTooltip from "../../../../helpers/pop-ups/helperTooltip";
import ClearIcon from "@mui/icons-material/Clear";

import { useAsyncFn } from "../../../../hooks/useAsync";
import { getSpellsForCharacter } from "../../../../services/assets";

const columns = [
  // { field: "assetId", headerName: "ID", type: "number", maxWidth: 40, flex: 1 },
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

export default function SpellDataTable({
  uId,
  handleSpellSelect,
}) {
  const [data, setData] = useState();

  const {
    loading,
    error,
    execute: getSpellsForCharacterFn,
  } = useAsyncFn(getSpellsForCharacter);

  //const [select, setSelection] = useState([]);

  useEffect(() => {
    getSpellsForCharacterFn({ uId })
      .then((data) => {
        //console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
      });
  }, []);

  function findSpell(array, id) {
    return array.find((e) => {
      return e.spellId === id;
    });
  }

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
            Choose starting spell for this profession
          </FormLabel>
          <HelperTooltip
            text={
              "For spellcasting professions (such as sorcerer, mage, priest), you can choose one starting spell"
            }
          />
        </Box>
        <Button
          endIcon={<ClearIcon />}
          onClick={(e) => {
            handleSpellSelect(0, "");
            setSelect(0);
          }}
        >
          Reset Choice
        </Button>
      </Box>
      <Box style={{ height: 550, width: "100%" }}>
        {loading ? (
          <div>loading...</div>
        ) : data?.length ? (
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.spellId}
            pageSize={10}
            rowsPerPageOptions={[10]}
            onSelectionModelChange={(e) => {
              const id = e[0];
              handleSpellSelect(id, findSpell(data, id).name);
              setSelect(id);
            }}
            selectionModel={select}
            hideFooterSelectedRowCount
            //checkboxSelection
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
          <div>No items:/</div>
        )}
      </Box>
    </Box>
  );
}
