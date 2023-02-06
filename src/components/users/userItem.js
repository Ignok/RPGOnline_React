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
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function UserItem({ user }) {

  const navigate = useNavigate()
  return (
    <Grid>
      <Card sx={{ width: 400, height: 180, mb: 3 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 1,
          }}
        >
          <Box align="center" sx={{ p: 1, width: 200 }}>
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
            <Rating size="small" precision={0.1} value={user.averageRating} readOnly />
          </Box>
          <Box
            sx={{
              px: 2,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography variant="h6" component="div">
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
                {user.aboutMe}
              </Typography>
            </Box>
            <Button size="small" sx={{ width: "100%", mt: 1 }} onClick={() => {
              console.log(user)
              user.hasBlockedMe ?
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `It seems like this user has blocked you ¯\\_(ツ)_/¯`
              })
                :
                navigate(`/Profile/${user.uId}`)
            }}>
              View Profile
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
