import * as React from "react";
// import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled, Stack } from "@mui/material";

import ButtonBase from "@mui/material/ButtonBase";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { PersonAddAlt1 } from "@mui/icons-material";
import { Chip, CardActionArea } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import ReplyIcon from "@mui/icons-material/Reply";

import "../../App.css";

export default function CommentItem(props) {
  return (
    <Card sx={{ mb: 2, boxShadow: 2 }}>
      <Box sx={{ px: "15px", backgroundColor: "white" }}>
        <Stack
          spacing={2}
          direction="row"
          sx={{ backgroundColor: "transparent" }}
        >
          <Box sx={{ width: "100%" }}>
            <Stack
              spacing={2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              backgroundColor="transparent"
            >
              <Stack
                spacing={2}
                direction="row"
                alignItems="center"
                sx={{ backgroundColor: "transparent" }}
              >
                <Avatar
                  src={""}
                  sx={{ ml: 1, backgroundColor: "var(--accent)" }}
                ></Avatar>
                <Stack spacing={0} direction="column" sx={{ padding: 1 }}>
                  <Typography
                    fontWeight="bold"
                    sx={{ color: "neutral.darkBlue" }}
                  >
                    {props.username}
                  </Typography>
                  <Typography
                    sx={{ color: "neutral.grayishBlue", fontSize: "small" }}
                  >
                    {props.creationDate}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="text"
                  sx={{
                    fontWeight: 500,
                    textTransform: "capitalize",
                    color: "var(--accent)",
                  }}
                  startIcon={<ReplyIcon />}
                >
                  Reply
                </Button>
              </Stack>
            </Stack>
            <Typography sx={{ color: "neutral.grayishBlue", p: "12px 0" }}>
              {props.content}
            </Typography>
          </Box>
        </Stack>
      </Box>
      <CardActions
        disableSpacing
        sx={{
          bgcolor: "transparent",
          justifyContent: "right",
          height: 10,
          pb: 3,
        }}
      >
        <IconButton
          aria-label="add to favorites"
          sx={{ color: "var(--accent)" }}
        >
          <FavoriteIcon />
        </IconButton>
        <div>{props.likes}</div>
        <IconButton aria-label="comment" sx={{ color: "var(--accent)" }}>
          <CommentIcon />
        </IconButton>
        <div>{props.comments}</div>
      </CardActions>
    </Card>
  );
}
