import { usePost } from "../../contexts/postContext"
import { useAsyncFn } from "../../hooks/useAsync"
import { createComment } from "../../services/comments"
import { CommentList } from "../comments/commentList"
import CommentForm from "../comments/commentForm";
import { Box, Container } from "@mui/material";
import PostItem from "./postItem";
import { DatetimeToLocaleDateString } from "../../helpers/functions/DateTimeConverter";
import { useState } from "react";
import { Fail } from "../../helpers/pop-ups/failed";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { deletePost } from "../../services/posts";
import { Success } from "../../helpers/pop-ups/success";

export function PostDetails() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const { post, rootComments, createLocalComment } = usePost()
  const { loading, error, execute: createCommentFn } = useAsyncFn(createComment)

  const {execute: deletePostFn } = useAsyncFn(deletePost)

  const [ postDeleteFlag, setPostDeleteFlag ] = useState(false);

  const [ deletingPost, setDeletingPost] = useState(false)

  function onCommentCreate(content) {
    return createCommentFn({uId: auth.uId, postId: post.postId, content })
    .then(createLocalComment)
    .catch(err => {
      Fail.fire()
      .then(result =>{
        if(result.isConfirmed){
          navigate('/login', { replace: true });
        }
      });
    })
  }

  function handlePostDelete({postId}) {
    setDeletingPost(true);
    return deletePostFn({postId})
        .then((res) => {
          setPostDeleteFlag(!postDeleteFlag);
          Success.fire({
            icon: "success",
            title: "Post deleted successfully",
          })
          navigate('/forum')
          setDeletingPost(false)
        }).catch(() =>{
          setDeletingPost(false)
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
          <h1>Loading...</h1>
        ) : (
          <PostItem isDetails={true}
            key={post.postId}
            id={post.postId}
            authorId={post.creatorNavigation.uId}
            avatarSrc={post.creatorNavigation.picture}
            avatarAlt="avatar"
            username={post.creatorNavigation.username}
            date={DatetimeToLocaleDateString(post.creationDate)}
            title={post.title}
            text={post.content}
            imgSrc={post.picture === undefined ? "" : post.picture}
            imgAlt="picture"
            tag={post.tag}
            isLiked={post.isLiked}
            likes={post.likes}
            comments={post.comments.length}
            onPostDelete={handlePostDelete}
            deletingPost={deletingPost}
          />
        )}
        <h4>Comments</h4>
        <CommentForm loading={loading} error={error} onSubmit={onCommentCreate} isResponse={false} avatar={auth.avatar}/>
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