import React, { useState } from "react";
import PostItem from "./postItem";

import ForumSearch from "../forum/forumSearch";
import ForumMenu from "../forum/forumMenu";

import src1 from "../../helpers/pictures/test-img.jpg";
import src2 from "../../helpers/pictures/test-img-3.jpg";
import gif1 from "../../helpers/pictures/test.gif";

import { Container, Stack, Pagination } from "@mui/material";
import ForumNavbar from "../forum/forumNav";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

import useFetchPosts from "../../helpers/functions/useFetchPosts";



import { DatetimeToLocaleDateString } from "../../helpers/functions/DateTimeConverter";

export default function Posts() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const { posts, loading, error, pageCount } = useFetchPosts(params, page);

  const ResponsiveBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
      flexWrap: "nowrap",
    },
    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap",
    },
  }));

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
      return { ...prevParams, [param]: value }
    })
  }

  return (
    <Box>
      <ForumSearch params={params} onParamChange={handleParamChange} />
      <ResponsiveBox
        //maxWidth="100%"
        display="flex"
        //sx={{ flexWrap: "wrap", alignItems: "baseline", }}
      >
        <ForumNavbar params={params} onParamChange={handleParamChange} />
        <Container maxWidth="md" sx={{ pb: 5 }}>
          <ForumMenu />
          {/* inside we pass the actual post component */}
          <Stack
            spacing={3}
            direction="column"
            justifyContent="center"
            sx={{ flexGrow: 1 }}
          >
            <Pagination
              count={pageCount}
              page={page}
              onChange={(e, p) => {
                setPage(p);
              }}
              color="secondary"
              size="large"
              showFirstButton
              showLastButton
              sx={{
                ".MuiTablePagination-root": {
                  display: "flex",
                  justifyContent: "center",
                },
              }}
            />
            {loading && <h1>Loading...</h1>}
            {error && <h1>Error. Try Refreshing.</h1>}
            {loading || (posts.length === 0 ?
            <h1>No posts to display</h1>
            :
            posts.map((post) => {
              return (
                <PostItem
                  isDetails={false}
                  key={post.postId}
                  id={post.postId}
                  avatarSrc={post.creatorNavigation.picture}
                  avatarAlt="avatar"
                  username={post.creatorNavigation.username}
                  date={DatetimeToLocaleDateString(post.creationDate)}
                  title={post.title}
                  text={post.content}
                  imgSrc={post.postId === 1 ? src1 : post.picture} //tymczasowo do potestowania
                  imgAlt="picture"
                  // tag1="fanart"
                  // tag2="NPC"
                  likes={post.likes}
                  comments={post.comments}
                />
              );
            }))}
            <Pagination
              count={pageCount}
              page={page}
              onChange={(e, p) => {
                setPage(p);
              }}
              color="secondary"
              size="large"
              showFirstButton
              showLastButton
              sx={{
                ".MuiTablePagination-root": {
                  display: "flex",
                  justifyContent: "center",
                },
              }}
            />
          </Stack>
        </Container>
      </ResponsiveBox>
    </Box>
  );
}
