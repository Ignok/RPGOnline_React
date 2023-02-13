import { Box } from "@mui/material";
import EngineeringIcon from '@mui/icons-material/Engineering';
import {Stack, Typography} from "@mui/material";


export default function WorkInProgressContents() {


    return (
        <Box>
            <Box
                position="static"
                alignItems="center"
                sx={{
                    bgcolor: "var(--accent)",
                    boxShadow: 1,
                    padding: 1.5,
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                    sx={{ bgColor: "#da57b3", mx: 2 }}
                >
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", sm: "none", md: "inline" },
                            color: "white",
                            fontStyle: "italic",
                            fontWeight: "bold",
                        }}
                    >
                        WORK IN PROGRESS
                    </Typography>
                </Stack>
            </Box>
            <EngineeringIcon sx={{fontSize: "200px"}} />
        </Box>
    );
}
