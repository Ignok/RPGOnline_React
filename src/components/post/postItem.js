import * as React from "react";
// import { Link } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { PersonAddAlt1 } from "@mui/icons-material";
import { Link, Chip } from "@mui/material";


import "../../App.css";

export default function PostItem(props) {
  return (
    <Card sx={{ maxWidth: 600, maxHeight: 500 }}>
      <CardHeader
        sx={{ bgcolor: "var(--accent)", borderBottom: 1 }}
        avatar={
          <Avatar
            sx={{ bgcolor: "text.secondary" }}
            alt={props.avatarAlt}
            src={props.avatarSrc}
          />
        }
        action={
          <IconButton aria-label="follow">
            <PersonAddAlt1 />
          </IconButton>
        }
        title={props.title}
        subheader={props.date}
      />
      <CardContent
        sx={{
          bgcolor: "var(--accent)",
          maxHeight: "auto",
        }}
      >
        <Typography
          noWrap
          variant="body2"
          color="text.secondary"
          sx={{ padding: 1 }}
        >
          {props.text}
        </Typography>
        <CardMedia
          component="img"
          image={props.imgSrc}
          alt={props.imgAlt}
          sx={{
            bgcolor: "var(--accent-bg)",
            // padding: "1em 1em 1em 1em",
            objectFit: "contain",
            maxHeight: 270,
          }}
        />
      </CardContent>
      <CardActions sx={{ bgcolor: "var(--accent)", maxHeight: 10, pl: 2}}>
        {props.tag1 ? (
          <Chip label={"#" + props.tag1} component="a" href="#" clickable />
        ) : null}
        {props.tag2 ? (
          <Chip label={"#" + props.tag2} component="a" href="#" clickable />
        ) : null}
      </CardActions>
      <CardActions
        disableSpacing
        sx={{ bgcolor: "var(--accent)", justifyContent: "right", px: 12 }}
      >
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <div>{props.likes}</div>
        <IconButton aria-label="comment" sx={{ ml: "auto" }}>
          <CommentIcon />
        </IconButton>
        <div>{props.comments}</div>
      </CardActions>
    </Card>
  );
}
