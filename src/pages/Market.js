import React, { Component, useState, useParams } from "react";
import MarketMenu from "../components/market/marketMenu";
import MarketNavbar from "../components/market/marketNav";
import MarketContents from "../components/market/marketContents";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Pagination } from "@mui/material";

import "../App.css";
import useFetchAssets from "../helpers/functions/useFetchAssets";

export function AssetMarket() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const [assetName, setAssetName] = useState("-");
  const [prefferedLanguage, setPrefferedLanguage] = useState("BOTH");
  const { assets, loading, error, pageCount, initial } = useFetchAssets(params, page, assetName, prefferedLanguage);

  function handleAssetNameChange(e) {
    e.preventDefault();
    console.log(e.target);
    const param = e.target.getAttribute("name");
    const value = e.target.value ?? e.target.getAttribute("name");
    console.log(param)
    console.log(value)
    setPage(1)
    setAssetName(() => {
      return {assetName: value}
    })
  }

  function handleLanguageChange(checked) {
    console.log(checked);
    const lang = (checked.pl ? (checked.en ? "BOTH" : "POLISH") : (checked.en ? "ENGLISH" : "BOTH"));
    console.log(lang);
    setPage(1);
    setPrefferedLanguage(() => {
      return { prefferedLanguage: lang };
    });
  }

  function handleParamChange(e) {
    e.preventDefault();
    console.log(e)
    const param = e.target.getAttribute('name')
    const value = e.target.value
    console.log("--------")
    console.log(param)
    console.log(value)
    setPage(1)
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    })
  }

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
        <MarketNavbar onAssetNameChange={handleAssetNameChange} />
      </Box>
      <Box
        sx={{
          width: 300,
          height: "100%",
          flexGrow: 1,
        }}
      >
        <MarketMenu params={params} onParamChange={handleParamChange} onLanguageChange={handleLanguageChange} />
        {initial && (
          <h4>
            Welcome in asset market. Here you can find a variety of things you
            can use in your RPG Game.
          </h4>
        )}
        {!initial &&
          (loading ? (
            <Box sx={{ width: "100%", mt: 7,}}>
              <LinearProgress color="secondary" />
            </Box>
          ) : assets?.length ? (
            <>
              <Pagination
                count={pageCount}
                page={page}
                onChange={(e, p) => {
                  setPage(p);
                  window.scrollTo(0, 0);
                }}
                color="secondary"
                size="large"
                showFirstButton
                showLastButton
                sx={{
                  ".MuiTablePagination-root": {
                    display: "flex",
                    justifyContent: "center",
                  },
                }}
              />
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
                {assets.map((asset) => {
                  return (
                    <MarketContents
                      key={asset.assetId}
                      assetName={assetName}
                      id={assetName}
                      asset={asset}
                    />
                  );
                })}
              </Box>
              <Pagination
                count={pageCount}
                page={page}
                onChange={(e, p) => {
                  setPage(p);
                  window.scrollTo(0, 0);
                }}
                color="secondary"
                size="large"
                showFirstButton
                showLastButton
                sx={{
                  ".MuiTablePagination-root": {
                    display: "flex",
                    justifyContent: "center",
                  },
                }}
              />
            </>
          ) : (
            <h4>No items to display</h4>
          ))}
      </Box>
    </Box>
  );
}
