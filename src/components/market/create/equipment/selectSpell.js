import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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

export default function SpellDataTable({ uId, handleSpellSelect }) {
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
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
      });
  }, []);

  return (
    <Box style={{ height: 380, width: "100%" }}>
      {loading ? (
        <div>loading...</div>
      ) : data?.length ? (
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.spellId}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onSelectionModelChange={(e) => {
            handleSpellSelect(e[0]);
          }}
          //selectionModel={select}
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
  );
}
