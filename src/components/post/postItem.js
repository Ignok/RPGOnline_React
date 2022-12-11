import * as React from "react";
// import { Link } from "react-router-dom";

import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
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
import { Chip, CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";

import "../../App.css";
import { getImage } from "../../helpers/functions/getImage";

export default function PostItem(props) {
  
  const [flag, setFlag] = React.useState(true);
  const [flagFollow, setFlagFollow] = React.useState(true);

  const handleClick = () => {
    setFlag(!flag);
  };

  const handleClickFollow = () => {
    setFlagFollow(!flagFollow);
  };

  const FollowButton = styled(Button)(() => ({
    color: "var(--accent-bg)",
    backgroundColor: flagFollow ? "#572348" : "#b74a97",
    borderRadius: 20,
    "&:hover": {
      backgroundColor: flagFollow ? "#572348" : "#b74a97",
    },
  }));

  return (
    <Card sx={{ maxWidth: "auto", maxHeight: "md", mb: 3 }}>
      <CardHeader
        sx={{ bgcolor: "var(--accent)", borderBottom: 1 }}
        avatar={
          <Avatar
            sx={{ bgcolor: "text.secondary", ml: 1 }}
            alt={props.avatarAlt}
            src={getImage(props.avatarSrc).img}
          />
        }
        action={
          <FollowButton
            variant="contained"
            disableElevation
            onClick={handleClickFollow}
            key={props.id}
            sx={{ mt: 0.5, mx: 2, width: 110 }}
          >
            {flagFollow ? "FOLLOW" : "FOLLOWED"}
          </FollowButton>
        }
        // titleTypographyProps={{ variant: "h6" }}
        title={props.username}
        subheader={props.date}
      />
      <CardActionArea>
        <Link to={`/post/${props.id}`} style={{ textDecoration: "none" }}>
          <CardContent
            sx={{
              bgcolor: "var(--accent)",
              maxHeight: "auto",
            }}
          >
            <Typography
              noWrap={true}
              color="text.secondary"
              variant="h6"
              sx={{ mb: 1, fontWeight: "bold" }}
            >
              {props.title}
            </Typography>
            {!props.imgSrc && (
              <Typography
                noWrap={!props.isDetails}
                variant="body2"
                color="text.secondary"
              >
                {props.text}
              </Typography>
            )}
            {props.imgSrc && (
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
            )}
          </CardContent>
        </Link>
      </CardActionArea>
      {/* <CardActions sx={{ bgcolor: "var(--accent)", maxHeight: 10, pl: 2 }}>
        {props.tag1 ? (
          <Chip label={"#" + props.tag1} component="a" href="#" clickable />
        ) : null}
        {props.tag2 ? (
          <Chip label={"#" + props.tag2} component="a" href="#" clickable />
        ) : null}
      </CardActions> */}
      <CardActions
        disableSpacing
        sx={{ bgcolor: "var(--accent)", justifyContent: "right", px: 12 }}
      >
        <IconButton
          aria-label="add to favorites"
          onClick={handleClick}
          sx={{ color: flag ? "#572348" : "#b50c3b" }}
        >
          <FavoriteIcon />
        </IconButton>
        <div>{props.likes}</div>
        <IconButton
          aria-label="comment"
          sx={{ ml: "auto" }}
          component={Link}
          to={`/post/${props.id}`}
        >
          <CommentIcon />
        </IconButton>
        <div>{props.comments}</div>
      </CardActions>
    </Card>
  );

}
