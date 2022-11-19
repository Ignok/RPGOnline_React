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
          tag1="fanart"
          tag2="NPC"
          likes="12.k"
          comments="201"
        />

        <PostItem
          avatarSrc=""
          avatarAlt="bocz"
          title="cosplay"
          date="November 19, 2022"
          text="Jeszcze przekierowanie do post details + posty ktore maja TYLKO tekst?"
          imgSrc={src2}
          imgAlt="bard"
          tag1="fanart"
          likes="666"
          comments="0"
        />

        <PostItem
          avatarSrc=""
          avatarAlt="bocz"
          title="kitku"
          date="November 19, 2022"
          text="w przyszlosci wypadaloby rozszerzyc styl o np zmiane koloru przy like'u"
          imgSrc={gif1}
          imgAlt="kitku"
          likes="0"
          comments="0"
        />
      </Stack>
    </Container>
  );
}
