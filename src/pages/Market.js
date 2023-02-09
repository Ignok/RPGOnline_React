import React, { Component, useState, useEffect } from "react";
import MarketMenu from "../components/market/marketMenu";
import MarketNavbar from "../components/market/marketNav";
import MarketContents from "../components/market/marketContents";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Pagination } from "@mui/material";

import { useParams } from "react-router-dom";

import "../App.css";
import useFetchAssets from "../helpers/functions/useFetchAssets";

export function AssetMarket() {
  const { option, type } = useParams();

  const [params, setParams] = useState({});

  const [preUrl, setPreUrl] = useState();
  const [sort, setSort] = useState({
    sortingByDate: false,
    sortingByLikes: false,
    ifOnlyMyAssets: false,
  });

  const [page, setPage] = useState(1);
  const [assetName, setAssetName] = useState("-");
  const [prefferedLanguage, setPrefferedLanguage] = useState("BOTH");
  const [keyValue, setKeyValue] = useState("");
  const { assets, loading, error, pageCount, initial } = useFetchAssets(
    params,
    page,
    assetName,
    prefferedLanguage,
    keyValue.keyValue,
    preUrl,
    sort
  );

  useEffect(() => {
    //console.log(option)
    if (option) {
      setAssetName(() => {
        return { assetName: option };
      });
      setPage(1);
      setKeyValue("");
      setPreUrl();
    } else if (type) {
      //console.log(type)
      setAssetName(() => {
        return { assetName: type };
      });
      setPage(1);
      setKeyValue("");
      setPreUrl("character/")
    }
  }, [option, type, sort])

  function handleKeyValueChange(value) {
    //console.log(value);
    setKeyValue(() => {
      return { keyValue: value };
    });
  }

  // function handleAssetNameChange(e) {
  //   e.preventDefault();
  //   //console.log(e.target);
  //   const param = e.target.getAttribute("name");
  //   const value = e.target.value ?? e.target.getAttribute("name");
  //   //console.log(param)
  //   //console.log(value)
  //   setPage(1);
  //   setKeyValue("");
  //   setAssetName(() => {
  //     return { assetName: value };
  //   });
  // }

  function handleLanguageChange(checked) {
    const lang = checked.pl
      ? checked.en
        ? "BOTH"
        : "POLISH"
      : checked.en
        ? "ENGLISH"
        : "BOTH";
    setPage(1);
    setPrefferedLanguage(() => {
      return { prefferedLanguage: lang };
    });
  }

  function handleSortChange(sortVal) {
    //console.log(sortVal)

    if(sortVal === "date"){
      setSort({
        sortingByDate: true,
        sortingByLikes: false,
        ifOnlyMyAssets: false,
      })
    } else if(sortVal === "likes"){
      setSort({
        sortingByDate: false,
        sortingByLikes: true,
        ifOnlyMyAssets: false,
      })
    } else {
      setSort({
        sortingByDate: false,
        sortingByLikes: false,
        ifOnlyMyAssets: false,
      })
    }
    

  }

  function handleParamChange(e) {
    e.preventDefault();
    console.log(e);
    const param = e.target.getAttribute("name");
    const value = e.target.value;
    console.log("--------");
    console.log(param);
    console.log(value);
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
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
        <MarketNavbar option={option} type={type} />
      </Box>
      <Box
        sx={{
          width: 300,
          height: "100%",
          flexGrow: 1,
        }}
      >
        <MarketMenu
          params={params}
          onParamChange={handleParamChange}
          onLanguageChange={handleLanguageChange}
          onKeyValueChange={handleKeyValueChange}
          onSortChange={handleSortChange}
          assetName={assetName}
          keyValue={keyValue}
        />
        {initial && (
          <h4>
            Welcome in asset market. Here you can find a variety of things you
            can use in your RPG Game.
          </h4>
        )}
        {!initial &&
          (loading ? (
            <Box sx={{ width: "100%", mt: 7 }}>
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
