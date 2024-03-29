import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import HelperTooltip from "../../../../../helpers/pop-ups/helperTooltip";
import LinearProgress from "@mui/material/LinearProgress";
import Modal from "@mui/material/Modal";
import useFetchRaces from "../../../../../helpers/functions/useFetchRaceForCharacter";

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
  { field: "language", headerName: "Language", maxWidth: 90, flex: 1 },
];

export default function RaceDataTable({
  uId,
  keyValue,
  handleRaceSelect,
  open,
  handleRaceClose,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    width: "60%",
  };

  const [keyValRace, setKeyValRace] = useState(keyValue);
  const { loading, initial, races } = useFetchRaces(keyValRace, uId);

  const [select, setSelect] = useState(0);

  const [raceName, setRaceName] = useState("");

  useEffect((e) => {
    setSelect(e);
  }, []);

  function findRace(array, id) {
    return array.find((e) => {
      return e.raceId === id;
    });
  }

  return (
    <Modal open={open} onClose={handleRaceClose}>
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
              Choose Race
            </FormLabel>
            <HelperTooltip
              text={`Attribute with lowest value will determine your character's race`}
            />
          </Box>
        </Box>
        <Box style={{ height: 550, width: "100%" }}>
          {initial ? (
            "To choose a Race you have to roll for attributes first!"
          ) : loading ? (
            <LinearProgress color="secondary" />
          ) : races?.length ? (
            <DataGrid
              rows={races}
              columns={columns}
              getRowId={(row) => row.raceId}
              pageSize={10}
              rowsPerPageOptions={[10]}
              onSelectionModelChange={(e) => {
                setRaceName(findRace(races, e[0])?.name);
                handleRaceSelect(findRace(races, e[0])?.name, e[0]);
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
            "Sorry, something went wrong when fetching Races"
          )}
        </Box>
        <FormLabel sx={{ mt: 2 }}>
          {raceName === "" || raceName === undefined
            ? ""
            : `You have chosen Race: ${raceName}`}
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
            onClick={handleRaceClose}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
