import React, { useState, useEffect } from "react";
import PostItem from "./postItem";
import ForumSearch from "../forum/forumSearch";
import ForumMenu from "../forum/forumMenu";
import ForumNavbar from "../forum/forumNav";
import { useParams } from "react-router-dom";
import { Card, Container, Stack, Pagination, CardContent, Typography, LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import useFetchPosts from "../../helpers/functions/useFetchPosts";
import { Success } from "../../helpers/pop-ups/success";
import { DatetimeToLocaleDateString } from "../../helpers/functions/DateTimeConverter";
import { deletePost } from "../../services/posts";
import { useAsyncFn } from "../../hooks/useAsync";

export default function Posts() {
  const { option, tagName } = useParams();
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)

  const {execute: deletePostFn } = useAsyncFn(deletePost)

  const [ postDeleteFlag, setPostDeleteFlag ] = useState(false);

  const [ deletingPost, setDeletingPost] = useState(false)

  const [pageOption, setPageOption] = useState({
    homePage: true,
    followed: false,
    favourite: false
  })

  const { posts, loading, error, pageCount } = useFetchPosts(params, page, pageOption, postDeleteFlag);

  const ResponsiveBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
      flexWrap: "nowrap",
    },
    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap",
    },
  }));

  function handlePostDelete({postId}) {
    setDeletingPost(true);
    return deletePostFn({postId})
        .then((res) => {
          setPostDeleteFlag(!postDeleteFlag);
          Success.fire({
            icon: "success",
            title: "Post deleted successfully",
          })
          setDeletingPost(false)
        }).catch(() =>{
          setDeletingPost(false)
        })
  }

  function handleParamChange(e) {
    e.preventDefault();
    const param = e.target.getAttribute('name')
    const value = e.target.value
    setPage(1)
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    })
  }

  useEffect(() => {
    if(option){
      setParams(prevParams => {
        return { ...prevParams, ['tag']: '' }
      });
      option === "home" ?
    setPageOption({
      homePage: true,
      followed: false,
      favourite: false
    })
    :
    option === "followed" ?
    setPageOption({
      homePage: false,
      followed: true,
      favourite: false
    })
    :
    option === "favorite" ?
    setPageOption({
      homePage: false,
      followed: false,
      favourite: true
    })
    :
    setPageOption({
      homePage: true,
      followed: false,
      favourite: false
    })
    } else if( tagName ) {
      setPageOption({
        homePage: true,
        followed: false,
        favourite: false
      })
      setParams(prevParams => {
        return { ...prevParams, ['tag']: tagName }
      })
    } else {
      setPageOption({
        homePage: true,
        followed: false,
        favourite: false
      })
    }

    setPage(1)
  },[option, tagName])


  return (
    <Box>
      <ForumSearch params={params} onParamChange={handleParamChange} />
      <ResponsiveBox
        display="flex"
      >
        <ForumNavbar option={option} tagName={tagName} />
        <Container maxWidth="md" sx={{ pb: 5 }} >
          <>
            <ForumMenu />

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
              <h1>Error. Try Refreshing.</h1>
            }
            {!loading && (posts.length === 0 ?
              <h1>No posts to display</h1>
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
                      authorId={post.creatorNavigation.uId}
                      avatarSrc={post.creatorNavigation.picture}
                      avatarAlt="avatar"
                      username={post.creatorNavigation.username}
                      isFollowed={post.creatorNavigation.isFollowed}
                      date={DatetimeToLocaleDateString(post.creationDate)}
                      title={post.title}
                      text={post.content}
                      imgSrc={post.picture}
                      imgAlt="picture"
                      tag={post.tag}
                      isLiked={post.isLiked}
                      likes={post.likes}
                      comments={post.comments}
                      onPostDelete={handlePostDelete}
                      deletingPost={deletingPost}
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
