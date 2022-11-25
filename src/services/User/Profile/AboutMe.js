import React from "react";
import { useParams } from "react-router-dom";
import UserProfile from "../../../components/userprofile";
import ProfileNav from "./profileNav";
import { getUsersAbout } from "../../../Api_RPGOnline";
import { DatetimeToLocaleDateString } from "../../../helpers/functions/DateTimeConverter";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import { Container, Stack, Typography } from "@mui/material";

import UserMenu from "../../../components/userprofile/userMenu";
import UserHeading from "../../../components/userprofile/userHeading";
import {
  SelectCountry,
  SelectAttitude,
} from "../../../components/userprofile/aboutme/selects";
import CityAboutmeTextField from "../../../components/userprofile/aboutme/inputs";

import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";

import "../../../App.css";
import { alpha } from "@mui/material";

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();

  return <WrappedComponent {...props} params={params} />;
};

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 50,
  height: 50,
}));

const GridBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    gridColumn: 1,
  },
  [theme.breakpoints.up("md")]: {
    gridColumn: 2,
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    maxWidth: 300,
  },
}));

class AboutMe extends React.Component {
  constructor(props) {
    super(props);

    const uId = this.props.params.uId;

    console.log(uId);

    this.state = {
      uId: uId,
      user: [],
      error: null,
      isLoaded: false,
      message: null,
    };
  }

  refreshPage() {
    getUsersAbout(this.state.uId)
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({
            user: data,
            isLoaded: true,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  componentDidMount() {
    this.refreshPage();
  }

  render() {
    const { user } = this.state;
    console.log(user);

    return (
      <Grid
        container
        display="grid"
        sx={{
          gap: 1,
          padding: 1,
          gridTemplateColumns: "auto",
          gridTemplateRows: "auto",
          background: "transparent",
          overflow: "hidden",
          mb: 5,
          //   gridTemplateAreas: `"sidebar main"`
        }}
      >
        <Sidebar gridColumn={1} sx={{ minWidth: 175 }}>
          <Box
            display="flex"
            sx={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Stack direction="row">
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <SmallAvatar
                    alt="PL"
                    src={require("../../../helpers/pictures/poland_flag.png")}
                  />
                }
              >
                <Avatar
                  alt="Avatar"
                  src={require("../../../helpers/pictures/anonymous_user.png")}
                  variant="rounded"
                  sx={{ width: 150, height: 150 }}
                />
              </Badge>
            </Stack>
            <Box sx={{ typography: "subtitle2", mt: 1, mb: 2 }}>
              {user.email}
            </Box>
          </Box>
          <ProfileNav user={user} />
        </Sidebar>

        <GridBox sx={{ backgroundColor: "transparent" }}>
          <UserHeading
            username={user.username}
            date={DatetimeToLocaleDateString(user.creationDate)}
          />
          <UserMenu />

          <Box
            sx={{
              border: 1,
              borderRadius: 0,
              borderColor: "var(--accent)",
              backgroundColor: "var(--accent-opaque)",
              mt: 2,
              padding: 0,
            }}
          >
            <SelectCountry />
            <CityAboutmeTextField />
            <SelectAttitude />
          </Box>
        </GridBox>
      </Grid>
    );
  }
}

function changeOption(params) {
  const field = ReactDOM.createRoot(document.getElementById("profile-option"));

  field.render(params);
}

export default withRouter(AboutMe);
