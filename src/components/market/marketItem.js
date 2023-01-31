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
import { Stack } from "@mui/material";

import {
  item,
  profession,
  professionModifier,
  race,
  spell,
  simplifiedItem,
  simplifiedSpell,
} from "../../helpers/enums/assets";

function getCategory(cat) {
  switch (cat) {
    case "item":
      return item;
    case "profession":
      return profession;
    case "race":
      return race;
    case "spell":
      return spell;
    case "simplifiedItem":
      return simplifiedItem;
    case "simplifiedSpell":
      return simplifiedSpell;
  }
}

// const modifiersTable = (
//   <Box>
//     <Typography
//       variant="overline"
//       color="text.primary"
//       sx={{
//         fontWeight: "light",
//         textTransform: "uppercase",
//       }}
//     >
//       Skill modifiers:
//     </Typography>
//     <Typography
//       variant="body2"
//       color="text.primary"
//       key={column}
//       sx={{
//         fontWeight: "medium",
//         mt: 1,
//         mr: 2,
//         textTransform: column.includes("key") ? "uppercase" : "normal",
//       }}
//     >
//       {asset[`${column}`] ?? 0}
//     </Typography>
//   </Box>
// );

export default function MarketItem({ assetName, asset }) {
  const category = getCategory(assetName.assetName ?? assetName);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        //ml: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {category?.map(({ label, column }) => {
          return (
            <Box
              key={label}
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
                mb: 0.5,
              }}
            >
              <Box sx={{ width: 150 }}>
                <Typography
                  variant="overline"
                  color="text.primary"
                  sx={{
                    fontWeight: "light",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </Typography>
              </Box>

              <Box
                sx={{
                  width: { xs: "50%", sm: "65%", md: "70%", lg: "60%" },
                }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  key={column}
                  sx={{
                    fontWeight: "medium",
                    mt: 1,
                    mr: 2,
                    textTransform: column.includes("key")
                      ? "capitalize"
                      : "normal",
                  }}
                >
                  {asset[`${column}`] ?? "-"}
                </Typography>
              </Box>
            </Box>
          );
        })}

        {category === profession && (
          <Box>
            <Divider
              textAlign="right"
              role="presentation"
              sx={{
                fontWeight: "light",
                typography: "caption",
                color: "gray",
                mr: 1.5,
              }}
            >
              Skill modifiers
            </Divider>
            <Box
              sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
              {professionModifier?.map(({ label, column }) => {
                return (
                  <Box
                    key={label}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      mr: 3,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="overline"
                        color="text.primary"
                        key={label}
                        sx={{
                          fontWeight: "light",
                          textTransform: "uppercase",
                        }}
                      >
                        {label}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        key={column}
                        sx={{
                          fontWeight: "light",
                          mt: 1,
                          ml: 1,
                        }}
                      >
                        {asset[`${column}`] ?? 0}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {asset.itemList?.length > 0 && (
              <Box sx={{ border: 0, borderColor: "red" }}>
                <Divider
                  textAlign="right"
                  role="presentation"
                  sx={{
                    fontWeight: "light",
                    typography: "caption",
                    color: "gray",
                  }}
                >
                  Starting items: {asset.itemList?.length}
                </Divider>
                {asset.itemList?.map(function (row, index) {
                  return (
                    <Box key={index} sx={{ mb: 1 }}>
                      {index === 0 ? (
                        ""
                      ) : (
                        <Divider
                          sx={{
                            my: 1,
                            bgcolor: "secondary.light",
                          }}
                        />
                      )}
                      <MarketItem
                        key={row}
                        assetName={"simplifiedItem"}
                        asset={row}
                      />
                    </Box>
                  );
                })}
              </Box>
            )}

            {asset.spellList?.length > 0 && (
              <Box sx={{ border: 0, borderColor: "red" }}>
                <Divider
                  textAlign="right"
                  role="presentation"
                  sx={{
                    fontWeight: "light",
                    typography: "caption",
                    color: "gray",
                  }}
                >
                  Starting spells: {asset.spellList?.length}
                </Divider>
                {asset.spellList?.map(function (row, index) {
                  return (
                    <Box key={index} sx={{ mb: 1 }}>
                      {index === 0 ? (
                        ""
                      ) : (
                        <Divider
                          sx={{
                            my: 1,
                            bgcolor: "secondary.light",
                          }}
                        />
                      )}
                      <MarketItem
                        key={row}
                        assetName={"simplifiedSpell"}
                        asset={row}
                      />
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
