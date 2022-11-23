import * as React from "react";
import { styled, Stack } from "@mui/system";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import "../../App.css";
import img1 from "../../helpers/pictures/achievements/ach1.png";
import img2 from "../../helpers/pictures/achievements/ach2.png";
import img3 from "../../helpers/pictures/achievements/ach3.png";

export default function UserHeading(props) {
  return (
    <Card sx={{ display: "flex", borderRadius: 0, boxShadow: 0 }}>
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            component="div"
            variant="h4"
                      color="var(--accent)"
                      noWrap="true"
            sx={{
              fontWeight: "bold",
            }}
          >
            {props.username}
          </Typography>
          <Typography
            variant="subtitle1"
            color="var(--accent)"
            component="div"
            noWrap="true"
          >
            user since: {props.date}
          </Typography>
        </CardContent>
      </Box>
      <Box
        sx={{
          display: "flex",
                  width: "100%",
          minWidth: "100px",
                  justifyContent: "space-evenly",
          mx: 12
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: "100px", width: "100px", padding: 1 }}
          src={img1}
          alt="like a post"
        />
        <CardMedia
          component="img"
          sx={{ height: "100px", width: "100px", padding: 1 }}
          src={img2}
          alt="create your own character"
        />
        <CardMedia
          component="img"
          sx={{ height: "100px", width: "100px", padding: 1 }}
          src={img3}
          alt="run a campaign as GM"
        />
      </Box>
    </Card>
  );
}
