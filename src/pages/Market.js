import React, { Component, useState, useParams } from "react";
import MarketMenu from "../components/market/marketMenu";
import MarketNavbar from "../components/market/marketNav";
import MarketContents from "../components/market/marketContents";
import Box from "@mui/material/Box";

import { Pagination } from "@mui/material";

import "../App.css";
import useFetchAssets from "../helpers/functions/useFetchAssets";

export function AssetMarket() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const [assetName, setAssetName] = useState("-");
  const [PrefferedLanguage, setPrefferedLanguage] = useState("BOTH"); // do dodanie przyciski zmieniające preffered language
  const { assets, loading, error, pageCount, initial } = useFetchAssets(params, page, assetName, PrefferedLanguage);

  function handleAssetNameChange(e) {
    e.preventDefault();
    const param = e.target.getAttribute('name')
    const value = e.target.value
    console.log(param)
    console.log(value)
    setPage(1)
    setAssetName(() => {
      return {assetName: value}
    })
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
        <MarketNavbar onAssetNameChange={handleAssetNameChange}/>
      </Box>
      <Box
        sx={{
          width: 300,
          height: "100%",
          flexGrow: 1,
        }}
      >
        <MarketMenu params={params} onParamChange={handleParamChange}/>
        {initial && <h1>Welcome in asset market. Here you can find a variety of things you can youse in your RPG Game.</h1>}
        {!initial && (loading ?
          <h1>Loading . . .</h1>
          :
          (assets?.length ? (
            <>
              <Pagination
                count={pageCount}
                page={page}
                onChange={(e, p) => {
                  setPage(p);
                  window.scrollTo(0, 0)
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
                  window.scrollTo(0, 0)
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
          )))}

      </Box>
    </Box>
  );
}
