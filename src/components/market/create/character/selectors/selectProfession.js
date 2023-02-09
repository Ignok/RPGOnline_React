import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";

import HelperTooltip from "../../../../../helpers/pop-ups/helperTooltip";
import ClearIcon from "@mui/icons-material/Clear";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import useFetchProfessions from "../../../../../helpers/functions/useFetchProfessionForCharacter";

const columns = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 90,
    maxWidth: 130,
    flex: 1,
    fontWeight: "bold",
  },
  {
    field: "description",
    headerName: "Description",
    minWidth: 180,
    flex: 1,
  },
  {
    field: "talent",
    headerName: "Talent",
    minWidth: 140,
    flex: 1,
  },
  {
    field: "hiddenTalent",
    headerName: "Hidden Talent",
    minWidth: 140,
    flex: 1,
  },
  {
    field: "weaponMod",
    headerName: "Weapon",
    type: "number",
    maxWidth: 65,
    flex: 1,
  },
  {
    field: "armorMod",
    headerName: "Armor",
    type: "number",
    maxWidth: 65,
    flex: 1,
  },
  {
    field: "gadgetMod",
    headerName: "Gadget",
    type: "number",
    maxWidth: 65,
    flex: 1,
  },
  {
    field: "companionMod",
    headerName: "Companion",
    type: "number",
    maxWidth: 90,
    flex: 1,
  },
  {
    field: "psycheMod",
    headerName: "Psyche",
    type: "number",
    maxWidth: 65,
    flex: 1,
  },
  { field: "language", headerName: "Language", maxWidth: 90, flex: 1 },
];

export default function ProfessionDataTable({
  uId,
  keyValue,
  handleProfessionSelect,
  open,
  handleProfessionClose,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    width: "65%",
  };

  const [keyValProfession, setKeyValRace] = useState(keyValue);
  const { loading, error, initial, professions } = useFetchProfessions(
    keyValProfession,
    uId
  );

  const [select, setSelect] = useState(0);

  const [professionName, setProfessionName] = useState("");

  useEffect((e) => {
    setSelect(e);
  }, []);

  function findProfession(array, id) {
    return array.find((e) => {
      return e.professionId === id;
    });
  }

  return (
    <Modal open={open} onClose={handleProfessionClose}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            width: "100%",
          }}
        >
          <Box>
            <FormLabel sx={{ mb: 2, fontWeight: "bold" }}>
              Choose Profession
            </FormLabel>
            <HelperTooltip
              text={`Attribute with highest value will determine your character's Profession. 
              Profession defines proficiency in using various skills (weapons, gadgets etc.). 
              Choose your profession wisely, as some come with starting items 
              and in case of spellcasting professions - with starting spells.`}
            />
          </Box>
        </Box>
        <Box style={{ height: 550, width: "100%" }}>
          {initial ? (
            "To choose a Profession you have to roll for attributes first!"
          ) : loading ? (
            <LinearProgress color="secondary" />
          ) : professions?.length ? (
            <DataGrid
              rows={professions}
              columns={columns}
              getRowId={(row) => row.professionId}
              pageSize={10}
              rowsPerPageOptions={[10]}
              onSelectionModelChange={(e) => {
                const id = e[0];
                setProfessionName(findProfession(professions, e[0])?.name);
                handleProfessionSelect(
                  findProfession(professions, e[0])?.name,
                  e[0]
                );
                setSelect(e[0]);
              }}
              selectionModel={select}
              hideFooterSelectedRowCount
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
            "Sorry, something went wrong when fetching Professions"
          )}
        </Box>
        <FormLabel sx={{ mt: 2 }}>
          {professionName === "" || professionName === undefined
            ? ""
            : `You have chosen Profession: ${professionName}`}
        </FormLabel>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={{ width: "30%", mt: 2 }}
            onClick={handleProfessionClose}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
