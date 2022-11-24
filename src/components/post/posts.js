import React, { useState } from "react";
import PostItem from "./postItem";

import ForumSearch from "../forum/forumSearch";
import ForumMenu from "../forum/forumMenu";

import src1 from "../../helpers/pictures/test-img.jpg";
import src2 from "../../helpers/pictures/test-img-3.jpg";
import gif1 from "../../helpers/pictures/test.gif";

import { Container, Stack } from "@mui/material";
import ForumNavbar from "../forum/forumNav";
import Box from "@mui/material/Box";

import useFetchPosts from "../../helpers/functions/useFetchPosts";

import { DatetimeToLocaleDateString } from "../../helpers/functions/DateTimeConverter";

export default function Posts() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const { posts, loading, error } = useFetchPosts(params, page);

  return (
    <Box
      maxWidth="100%"
      display="flex"
      sx={{ flexWrap: "wrap", alignItems: "baseline", }}
    >
      <ForumNavbar />
      <Container maxWidth="md" sx={{ pb: 5 }}>
        <ForumSearch />
        <ForumMenu />
        {/* inside we pass the actual post component */}
        <Stack spacing={3} direction="column" justifyContent="center" sx={{ flexGrow: 1 }}>
          
            {loading && <h1>Loading...</h1>}
            {error && <h1>Error. Try Refreshing.</h1>}
            {posts.map(post => {
              return <PostItem
                key={post.postId}
                id={post.postId}
                avatarSrc={post.creatorNavigation.picture}
                avatarAlt="avatar"
                username={post.creatorNavigation.username}
                date={DatetimeToLocaleDateString(post.creationDate)}
                title={post.title}
                text={post.content}
                imgSrc={post.postId === 1 ? src1 : post.picture}
                imgAlt="picture"
                // tag1="fanart"
                // tag2="NPC"
                likes={post.likes}
                comments={post.comments}
              />
            })}
        </Stack>
      </Container>
    </Box>
  );
}
