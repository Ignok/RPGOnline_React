import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import "../../../../App.css";
import Modal from "@mui/material/Modal";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Badge from "@mui/material/Badge";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";


import { avatars } from "../../../../helpers/enums/avatars";
import { Button, Stack, Divider } from "@mui/material";

export function AvatarForm({
    handleClose,
    open,
    initialVal
}) {

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
    };


    const [chosen, setChosen] = useState(0);


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6">
                    {chosen}
                </Typography>
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={165}>
                    {avatars.map((item) => (
                        <Badge
                            key={item.id}
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            badgeContent={item.id === chosen ? <CheckCircleIcon /> : ""}
                            sx={{ color: "var(--accent)" }}
                        >
                            <ImageListItem
                                key={item.img}
                                sx={{
                                    border: item.id === chosen ? 5 : 0,
                                    borderColor: "var(--accent)",
                                }}
                                onClick={() => setChosen(() => item.id)}
                            >
                                <img
                                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        </Badge>
                    ))}
                </ImageList>
                <Stack
                    spacing={2}
                    justifyContent="space-between"
                    direction="row"
                >
                    <Button color="error" onClick={() => console.log("BACK")}>
                        BACK
                    </Button>
                    <Button color="inherit" sx={{ mx: 1 }} onClick={() => setChosen(0)}>
                        SELECT ANONYMOUS
                    </Button>
                    <Button color="info" sx={{ mx: 1 }} onClick={() => console.log("SAVE")}>
                        SAVE
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}