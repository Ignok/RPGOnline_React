import React, { Component } from "react";
import MarketMenu from "../components/market/marketMenu";
import MarketNavbar from "../components/market/marketNav";
import MarketContents from "../components/market/marketContents";
import Box from "@mui/material/Box";

import "../App.css";

export function AssetMarket() {
  // const {
  // } = useUser();
  // const { loading, error } = useAsyncFn();

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
          width: 300,
          height: "100%",
          flexGrow: 1,
        }}
      >
        <MarketMenu />
        <Box
          sx={{
            display: "grid",
            mt: { xs: 3, md: 5 },
            gap: 5,
            gridTemplateColumns: {
              md: "repeat(1, 1fr)",
              lg: "repeat(2, 1fr)",
            },
          }}
        >
          <MarketContents />
          <MarketContents />
          <MarketContents />
          <MarketContents />
        </Box>
      </Box>
    </Box>
  );
}
