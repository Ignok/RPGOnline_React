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

import { spells } from "../../helpers/enums/assets/spells";

export default function MarketItem() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        ml: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {spells.map(({ label, column }) => {
          return (
            <Box
            key={label}
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
                mb: 2,
              }}
            >
              <Box sx={{ width: 130 }}>
                <Typography
                  variant="overline"
                  color="text.primary"
                  sx={{ fontWeight: "light", textTransform: "uppercase" }}
                >
                  {label}
                </Typography>
              </Box>

              <Box sx={{ width: {xs: "50%", sm: "65%", md: "70%", lg: "55%"}, mr: 2 }}>
                <Typography
                  variant="body2"
                  color="text.primary"
                  key={column}
                  sx={{
                      fontWeight: "medium",
                      mt: 1,
                  }}
                >
                  {column}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
