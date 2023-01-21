import React, { Component } from "react";
import MarketMenu from "../components/market/marketMenu";
import MarketNavbar from "../components/market/marketNav";

import Box from "@mui/material/Box";

import "../App.css";

export class AssetMarket extends Component {
  render() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-start",
          mb: 20,
        }}
      >
        <Box
          sx={{
            flexGrow: 0,
            display: "flex",
            alignItems: "center",
            width: { xs: "100%", sm: "100%", md: 250 },
            height: "100%",
          }}
        >
          <MarketNavbar />
        </Box>
        <Box
          sx={{
            width: 600,
            flexGrow: 1,
          }}
        >
          <MarketMenu />
        </Box>
      </Box>
    );
  }
}
