import { usePost } from "../../contexts/postContext"
import { useAsyncFn } from "../../hooks/useAsync"
//import { createComment } from "../services/comments"
//import { CommentForm } from "./CommentForm"
import { CommentList } from "../comments/commentList"

import CommentForm from "../comments/commentForm";
import {Box, Container, Stack } from "@mui/material";
import PostItem from "./postItem";
import { DatetimeToLocaleDateString } from "../../helpers/functions/DateTimeConverter";


export function PostDetails() {
  const { post, rootComments } = usePost()
  //const { loading, error, execute: createCommentFn } = useAsyncFn(createComment)

  // function onCommentCreate(message) {
  //   return createCommentFn({ postId: post.id, message }).then(
  //     createLocalComment
  //   )
  // }

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
        <CommentForm/>
        <section>
          {rootComments != null && rootComments.length > 0 && (
              <div>
                <CommentList comments={rootComments} isRoot={true}/>
              </div>
            )
          }
        </section>
      </Container>
    </Box>
  )
}