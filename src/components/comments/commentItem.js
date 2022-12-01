import * as React from "react";

import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";

import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

import ReplyIcon from "@mui/icons-material/Reply";

import { useState } from "react";

import "../../App.css";
import { usePost } from "../../contexts/postContext";
import { CommentList } from "../comments/commentList"
import CommentForm from "./commentForm";

import { useAsyncFn } from "../../hooks/useAsync"
import { createComment } from "../../services/comments"



export default function CommentItem(props) {
  const { post, getReplies, createLocalComment } = usePost()
  const childComments = getReplies(props.commentId)
  const createCommentFn = useAsyncFn(createComment)
  const [isReplying, setIsReplying] = useState(false)

  function onCommentReply(content) {
    return createCommentFn
      .execute({ postId: post.postId, content, responseCommentId: props.commentId })
      .then(comment => {
        setIsReplying(false)
        createLocalComment(comment)
      })
  }

  return (
    <>
      <Card sx={{ mb: 2, boxShadow: 2 }}>
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
                    src={props.avatar}
                    sx={{ ml: 1, backgroundColor: "var(--accent)" }}
                  ></Avatar>
                  <Stack spacing={0} direction="column" sx={{ padding: 1 }}>
                    <Typography
                      fontWeight="bold"
                      sx={{ color: "neutral.darkBlue" }}
                    >
                      {props.username}
                    </Typography>
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
                      color: "var(--accent)",
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
        <CardActions
          disableSpacing
          sx={{
            bgcolor: "transparent",
            justifyContent: "right",
            height: 10,
            pb: 3,
          }}
        >
          <IconButton
            aria-label="add to favorites"
            sx={{ color: "var(--accent)" }}
          >
            <FavoriteIcon />
          </IconButton>
          <div>{props.likes}</div>
          <IconButton aria-label="comment" sx={{ color: "var(--accent)" }}>
            <CommentIcon />
          </IconButton>
          <div>{props.comments}</div>
        </CardActions>
      </Card>

      {isReplying && (
        <CommentForm
          autoFocus
          onSubmit={onCommentReply}
          loading={createCommentFn.loading}
          error={createCommentFn.error} />
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
