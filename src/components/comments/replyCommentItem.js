import * as React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ReplyIcon from "@mui/icons-material/Reply";
import { useState } from "react";
import { usePost } from "../../contexts/postContext";
import { CommentList } from "../comments/commentList"
import CommentForm from "./commentForm";
import { useAsyncFn } from "../../hooks/useAsync"
import { createComment } from "../../services/comments"
import { getImage } from "../../helpers/functions/getImage";
import DeleteIcon from '@mui/icons-material/Delete';
import "../../App.css";
import useAuth from "../../hooks/useAuth";
import {ROLES} from '../../helpers/enums/roles'
import { deleteComment } from "../../services/comments";
import { Success } from "../../helpers/pop-ups/success";

export default function CommentItem(props) {

  const { auth } = useAuth();
  const {
    post,
    getReplies,
    createLocalComment,
    deleteLocalComment
  } = usePost()
  const childComments = getReplies(props.commentId)
  const createCommentFn = useAsyncFn(createComment)
  const deleteCommentFn = useAsyncFn(deleteComment)
  const [isReplying, setIsReplying] = useState(false)

  function onCommentReply(content) {
    return createCommentFn
      .execute({ uId: auth.uId, postId: post.postId, content, responseCommentId: props.commentId })
      .then(comment => {
        setIsReplying(false)
        createLocalComment(comment)
      })
      .catch(err => {
        Success.fire({
          icon: "error",
          title: "Something went wrong with uploading",
        });
      })
  }

  function onCommentDelete() {
    return deleteCommentFn
      .execute({ commentId: props.commentId })
      .then(res => {
        deleteLocalComment(res.comment.commentId)
      })
      .catch(err => {
        Success.fire({
          icon: "error",
          title: "Something went wrong with uploading",
        });
      })
  }

  return (
    <>
      <Card sx={{ mb: 2, ml: 10, boxShadow: 2 }}>
        <Box sx={{ px: "15px", backgroundColor: "white" }}>
          <Stack
            spacing={2}
            direction="row"
            sx={{ backgroundColor: "transparent" }}
          >
            <Box sx={{ width: "100%" }}>
              <Stack
                spacing={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                backgroundColor="transparent"
              >
                <Stack
                  spacing={2}
                  direction="row"
                  alignItems="center"
                  sx={{ backgroundColor: "transparent" }}
                >
                  <Avatar
                    src={getImage(props.avatar).img}
                    sx={{ ml: 1, backgroundColor: "var(--accent-light)" }}
                  ></Avatar>
                  <Stack spacing={0} direction="column" sx={{ padding: 1 }}>
                    <Stack direction="row">
                      <Typography
                        fontWeight="bold"
                        sx={{ color: "neutral.darkBlue" }}
                      >
                        {props.username}
                      </Typography>

                      <Typography
                        fontWeight="bold"
                        sx={{ color: "var(--accent-light)" }}
                      >
                        &nbsp;replied to: @{props.responseUsername}
                      </Typography>
                    </Stack>

                    <Typography
                      sx={{ color: "neutral.grayishBlue", fontSize: "small" }}
                    >
                      {props.creationDate}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Button
                    onClick={() => setIsReplying(prev => !prev)}
                    variant={isReplying ? "outlined" : "text"}
                    sx={{
                      fontWeight: 500,
                      textTransform: "capitalize",
                      color: "var(--accent-light)",
                    }}
                    startIcon={<ReplyIcon />}
                  >
                    {isReplying ? "Replying" : "Reply"}
                  </Button>
                </Stack>
              </Stack>
              <Typography sx={{ color: "neutral.grayishBlue", p: "12px 0" }}>
                {props.content}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {(
          (auth.uId === props.userResponse.uId)
          ||
          (auth.role === ROLES.Admin || auth.role === ROLES.Moderator)
        )
          &&
          <CardActions
            disableSpacing
            sx={{
              bgcolor: "transparent",
              justifyContent: "right",
              height: 10,
              pb: 3,
            }}
          >
            <IconButton onClick={onCommentDelete} aria-label="comment" sx={{ color: "var(--accent-light)" }}>
              <DeleteIcon />
            </IconButton>

          </CardActions>
        }
      </Card>

      {isReplying && (
        <CommentForm
          autoFocus
          onSubmit={onCommentReply}
          loading={createCommentFn.loading}
          error={createCommentFn.error}
          avatar={auth.avatar}
        />
      )
      }

      {
        childComments?.length > 0 && (
          <CommentList comments={childComments} isRoot={false} />
        )
      }
    </>
  );
}
