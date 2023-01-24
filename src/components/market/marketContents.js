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

import MarketItem from "./marketItem";
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
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "red",
    backgroundColor: "white",
  },
  border: 0,
});

export default function MarketContents({assetName, asset}) {
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = React.useState(false);

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
            avatar={<Avatar sx={{ width: 32, height: 32 }} />}
            title="username"
            subheader="creation_date"
            sx={{ height: 50, width: 300, height: "100%" }}
          />
          <Typography
            variant="subtitle1"
            color="var(--accent)"
            sx={{ mr: 2, fontWeight: "bold", textTransform: "uppercase" }}
          >
            assets_title
          </Typography>
        </Box>
        <Divider variant="middle" />

        {/* wlasciwe pola assetu */}
        <CardContent sx={{ px: 2, pb: 0 }}>
          <MarketItem />
        </CardContent>
        {/* zaleza od kategorii */}

        <CardActions
          sx={{ justifyContent: "flex-end", height: 30, mb: 2 }}
        >
          <StyledToggleButton
            value="check"
            selected={selected}
            onChange={() => {
              setSelected(!selected);
              //add to favorites
            }}
          >
            <FavoriteIcon />
          </StyledToggleButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
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
              Asset's description. ---Lorem ipsum, At vero eos et accusamus et
              iusto odio dignissimos ducimus qui blanditiis praesentium
              voluptatum deleniti atque corrupti quos dolores sint occaecati
              cupiditate non provident.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}
