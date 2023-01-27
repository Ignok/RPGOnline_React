import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ToggleButton from "@mui/material/ToggleButton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { Fail } from "../../helpers/pop-ups/failed";
import { useAsyncFn } from "../../hooks/useAsync";
import { useNavigate } from "react-router-dom";

import { getImage } from "../../helpers/functions/getImage";
import MarketItem from "./marketItem";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { saveAsset, unsaveAsset } from "../../services/assets";
import { Success } from "../../helpers/pop-ups/success";

import { DatetimeToLocaleDateString } from "../../helpers/functions/DateTimeConverter";
import App from "../../App.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const StyledToggleButton = styled(ToggleButton)({
    border: 0,
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "red",
    backgroundColor: "white",
  },
});



export default function MarketContents({ assetName, asset }) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(asset.isSaved);
  const [waiting, setWaiting] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth();
  

  const {execute: saveAssetFn } = useAsyncFn(saveAsset)
  const {execute: unsaveAssetFn } = useAsyncFn(unsaveAsset)

  const [likes, setLikes] = useState(asset.timesSaved);

  function onSaveAsset() {
    console.log("save")
    if(!auth.username){
      return Fail.fire()
      .then(result =>{
        if(result.isConfirmed){
          navigate('/login', { replace: true });
        }
      });
    }else{
      setWaiting(true);
      return saveAssetFn({ uId: auth.uId, assetId: asset.assetId })
        .then(res => {
          console.log(res);
          setSelected(true);
          setWaiting(false);
          Success.fire({
            icon: "success",
            title: "Asset saved successfully",
          })
          setLikes(likes + 1);
        })
        .catch(err => {
          console.log(err);
          setWaiting(false);
        });
    }
  }

  function onUnsaveAsset() {
    console.log("unsave")
    if(!auth.username){
      return Fail.fire()
      .then(result =>{
        if(result.isConfirmed){
          navigate('/login', { replace: true });
        }
      });
    }else{
      setWaiting(true);
      return unsaveAssetFn({uId: auth.uId, assetId: asset.assetId })
      .then(res => {
        console.log(res);
        setSelected(false);
        setWaiting(false);
        Success.fire({
          icon: "success",
          title: "Asset unsaved successfully",
        })
        setLikes(likes - 1);
      })
      .catch(err => {
        console.log(err);
        setWaiting(false);
      })
    }
  }


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Card sx={{ boxShadow: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt={"avatar"}
                src={getImage(asset.creatorNavigation.picture).img}
              />
            }
            title={asset.creatorNavigation.username}
            subheader={DatetimeToLocaleDateString(asset.creationDate)}
            sx={{ height: 50, width: 250, height: "100%" }}
          />
          <Typography
            variant="subtitle1"
            color="var(--accent)"
            sx={{
              mr: 2,
              fontWeight: "bold",
              textTransform: "uppercase",
              flexGrow: 1,
            }}
          >
            {asset.name}
          </Typography>
        </Box>
        <Divider variant="middle" />

        {/* wlasciwe pola assetu */}

        <CardContent sx={{ px: 2, pb: 0 }}>
          <MarketItem assetName={assetName} asset={asset} />
        </CardContent>
        {/* zaleza od kategorii */}

        <CardActions sx={{ justifyContent: "flex-end", height: 30, mb: 2 }}>
          <StyledToggleButton
            value="check"
            selected={selected}
            disabled={waiting}
            onChange={() => {
              //add to favorites
              selected ? onUnsaveAsset() : onSaveAsset();
            }}
          >
            <Tooltip title="Add to favorites">
              <FavoriteIcon />
            </Tooltip>
          </StyledToggleButton>
          <Typography sx={{mr: 2, ml: 0.5}}>{likes}</Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <Tooltip title="Show description">
              <ExpandMoreIcon />
            </Tooltip>
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              variant="body2"
              gutterBottom
              align="justify"
              sx={{ mx: 0.5 }}
            >
              {asset.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}
