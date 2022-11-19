import React from "react";
import PostItem from "./postItem";

import src1 from "../../helpers/pictures/test-img.jpg";
import src2 from "../../helpers/pictures/test-img-3.jpg";
import gif1 from "../../helpers/pictures/test.gif";

import { Container, Stack } from "@mui/material";

export default function Posts() {
  return (
    <Container maxWidth="sm" sx={{ pb: 5 }}>
      {/* inside we pass the actual post component */}
      <Stack spacing={4}>
        <PostItem
          avatarSrc=""
          avatarAlt="julec"
          title="fanart"
          date="November 18, 2022"
          text="Jaki śliczny ślimaczek! ijsdhufbsudhbfiusbdujfgbusgbdfusgbudfbsuibfusdbfusdb"
          imgSrc={src1}
          imgAlt="slimak"
          likes="12.k"
          comments="201"
        />

        <PostItem
          avatarSrc=""
          avatarAlt="bocz"
          title="cosplay"
          date="November 19, 2022"
          text="Jeszcze jakoś trzeba dodać tagi i przekierowanie do post details"
          imgSrc={src2}
          imgAlt="bard"
          likes="666"
          comments="0"
        />

        <PostItem
          avatarSrc=""
          avatarAlt="bocz"
          title="kitku"
          date="November 19, 2022"
          text="test"
          imgSrc={gif1}
          imgAlt="bard"
          likes="0"
          comments="0"
        />
      </Stack>
    </Container>
  );
}
