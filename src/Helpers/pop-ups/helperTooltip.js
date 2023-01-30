import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ededed",
    color: theme.palette.common.black,
    boxShadow: theme.shadows[2],
    fontSize: 14,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ededed",
  },
}));

export default function HelperTooltip({ text }) {
  return (
    <LightTooltip title={text} arrow placement="right">
      <IconButton size="small" sx={{ mb: 2 }}>
        <HelpOutlineIcon fontSize="small" />
      </IconButton>
    </LightTooltip>
  );
}
