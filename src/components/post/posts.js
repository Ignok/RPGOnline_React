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

import PostPagination from "./PostPagination";

import { DatetimeToLocaleDateString } from "../../helpers/functions/DateTimeConverter";

export default function Posts() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const { posts, loading, error, hasNextPage } = useFetchPosts(params, page);


  function handleParamChange(e) {
    e.preventDefault();
    console.log(e)
    const param = e.target.getAttribute('name')
    const value = e.target.value
    console.log("--------")
    console.log(param)
    console.log(value)
    setPage(1)
    setParams(prevParams => {
      return { ...prevParams, [param]: value}
    })
  }

  return (
    <Box
      maxWidth="100%"
      display="flex"
      sx={{ flexWrap: "wrap", alignItems: "baseline", }}
    >
      <ForumNavbar params={params} onParamChange={handleParamChange} />
      <Container maxWidth="md" sx={{ pb: 5 }}>
        <ForumSearch params={params} onParamChange={handleParamChange} />
        <ForumMenu />
        {/* inside we pass the actual post component */}
        <Stack spacing={3} direction="column" justifyContent="center" sx={{ flexGrow: 1 }}>
          <PostPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
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
            <PostPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
        </Stack>
      </Container>
    </Box>
  );
}
