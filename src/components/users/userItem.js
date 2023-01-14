import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import { getImage } from "../../helpers/functions/getImage";
import Grid from "@mui/material/Unstable_Grid2";
export default function UserItem({ user }) {
  return (
    <Grid md={2} lg={4}>
      <Card sx={{ maxWidth: 450, maxHeight: 180, mb: 3 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 1,
          }}
        >
          <Box align="center" sx={{ p: 1, minWidth: 120 }}>
            <CardMedia
              component="img"
              image={getImage(user.picture).img}
              alt="{props.imgAlt}"
              sx={{
                bgcolor: "var(--accent-bg)",
                objectFit: "contain",
                borderRadius: "5px",
                mb: 1,
              }}
            />
            <Rating size="small" precision={0.5} value={4.5} readOnly />
          </Box>
          <Box sx={{ px: 2 }}>
            <Typography
              variant="h6"
              component="div"
            >
              {user.username}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              {user.attitude}
            </Typography>
            <Box sx={{ minWidth: "auto", minHeight: 60 }}>
              <Typography
                variant="body2"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                }}
              >
                bio Lorem Ipsum is siimply dummy te te te a a a aa tesiimply
                dummy te te te tesiimply dummy tesiimply dummy tesiimply dummy
                tesiimply dummy tesiimply dummy te te te tesiimply dummy
                tesiimply dummy tesiimply dummy tesiimply dummy tesiimply dummy
                tesiimply dummy te tesiimply dummy tesiimply dummy tesiimply
                dummy tesiimply dummy tesiimply dummy tesiimply dummy te
              </Typography>
            </Box>
            <Button size="small" sx={{ width: "100%", mt: 1 }}>
              View Profile
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
