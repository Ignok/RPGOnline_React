import { usePost } from "../../contexts/postContext"
import { useAsyncFn } from "../../hooks/useAsync"
import { createComment } from "../../services/comments"
//import { CommentForm } from "./CommentForm"
import { CommentList } from "../comments/commentList"

import CommentForm from "../comments/commentForm";
import { Box, Container, Stack } from "@mui/material";
import PostItem from "./postItem";
import { DatetimeToLocaleDateString } from "../../helpers/functions/DateTimeConverter";
import { useState } from "react";
import { Fail } from "../../helpers/pop-ups/failed";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


export function PostDetails() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const { post, rootComments, createLocalComment } = usePost()
  const { loading, error, execute: createCommentFn } = useAsyncFn(createComment)

  function onCommentCreate(content) {
    return createCommentFn({uId: auth.uId, postId: post.postId, content })
    .then(createLocalComment)
    .catch(err => {
      console.log(err)
      Fail.fire()
      .then(result =>{
        if(result.isConfirmed){
          navigate('/login', { replace: true });
        }
      });
    })
  }

  return (
    <Box
      maxWidth="100%"
      display="flex"
      sx={{
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md" sx={{ pb: 5 }}>
        {post.creatorNavigation === undefined ? (
          console.log("loading")
        ) : (
          <PostItem isDetails={true}
            key={post.postId}
            id={post.postId}
            avatarSrc={post.creatorNavigation.picture}
            avatarAlt="avatar"
            username={post.creatorNavigation.username}
            date={DatetimeToLocaleDateString(post.creationDate)}
            title={post.title}
            text={post.content}
            imgSrc={post.picture === undefined ? "" : post.picture}
            imgAlt="picture"
            // tag1="fanart"
            // tag2="NPC"
            likes={post.likes}
            comments={post.comments.length}
          />
        )}
        <h4>Comments</h4>
        <CommentForm loading={loading} error={error} onSubmit={onCommentCreate} isResponse={false} />
        <section>
          {rootComments != null && rootComments.length > 0 && (
            <div>
              <CommentList comments={rootComments} isRoot={true} />
            </div>
          )
          }
        </section>
      </Container>
    </Box>
  )
}