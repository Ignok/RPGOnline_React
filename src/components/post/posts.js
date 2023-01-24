import React, { useState } from "react";
import PostItem from "./postItem";

import ForumSearch from "../forum/forumSearch";
import ForumMenu from "../forum/forumMenu";
import ForumNavbar from "../forum/forumNav";

import src1 from "../../helpers/pictures/test-img.jpg";
import src2 from "../../helpers/pictures/test-img-3.jpg";
import gif1 from "../../helpers/pictures/test.gif";

import { Card, Container, Stack, Pagination, CardContent, Typography, LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { height, styled } from "@mui/system";

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
        <Container maxWidth="md" sx={{ pb: 5 }} >
          <>
            <ForumMenu />
            {/* inside we pass the actual post component */}

            {loading &&
              <Card sx={{ maxWidth: "auto", maxHeight: "md", mb: 3 }}>
                <CardContent
                  sx={{
                    bgcolor: "var(--accent)",
                    maxHeight: "auto",
                  }}
                >
                  <Typography
                    noWrap={true}
                    color="text.secondary"
                    variant="h6"
                    sx={{ mb: 1, fontWeight: "bold", alignItems: 'center', justifyContent: 'center', display: 'flex', height: '10vh' }}
                  >
                    <LinearProgress sx={{ mb: 1, minWidth: '100vw' }}/>
                  </Typography>
                </CardContent>
              </Card>

            }
            {error &&
              <h1>Error. Try Refreshing.<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></h1>
            }
            {loading || (posts.length === 0 ?
              <h1>No posts to display<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></h1>
              :

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
                    window.scrollTo(0, 0)
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
                {posts.map((post) => {
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
                })}
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(e, p) => {
                    setPage(p);
                    window.scrollTo(0, 0)
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
            )}
          </>
        </Container>
      </ResponsiveBox>
    </Box>
  );
}
