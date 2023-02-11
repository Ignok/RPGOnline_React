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
import { Button, Stack } from "@mui/material";
import { editAvatar } from "../../../../services/users";
import { useAsyncFn } from "../../../../hooks/useAsync";
import { Success } from "../../../../helpers/pop-ups/success";

export function AvatarForm({ uId, handleClose, open, initialVal, updateLocalAvatar }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const [chosen, setChosen] = useState(initialVal);
  const { execute: editAvatarFn } = useAsyncFn(editAvatar);

  function onAvatarEdit({ picture }) {
    if (chosen !== initialVal) {
      return editAvatarFn({
        uId: uId,
        picture: picture,
      }).then(() => {
        updateLocalAvatar(picture);
        Success.fire({
          icon: "success",
          title: "Profile picture changed successfully",
        })
      });
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" sx={{ mb: 2 }}>
          Choose your avatar: {chosen === 0 ? "None" : avatars.find((e) => e.id === chosen).title}
        </Typography>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={165}>
          {avatars.slice(1).map((item) => (
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
                onClick={() => setChosen(item.id)}
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
        <Stack spacing={2} justifyContent="space-between" direction="row">
          <Button color="error" onClick={handleClose}>
            BACK
          </Button>
          <Button color="inherit" sx={{ mx: 1 }} onClick={() => setChosen(0)}>
            SELECT ANONYMOUS
          </Button>
          <Button
            color="info"
            sx={{ mx: 1 }}
            onClick={() => {
              onAvatarEdit({
                picture: chosen,
              });
              handleClose();
            }}
          >
            SAVE
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
