import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { Chip, CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useAsyncFn } from "../../hooks/useAsync";
import { Fail } from "../../helpers/pop-ups/failed";
import { Success } from "../../helpers/pop-ups/success";
import { likePost, unlikePost } from "../../services/posts";
import DeleteIcon from '@mui/icons-material/Delete';
import {ROLES} from '../../helpers/enums/roles'
import Swal from "sweetalert2";
import "../../App.css";
import { getImage } from "../../helpers/functions/getImage";
import { manageFriendship } from "../../services/users";

export default function PostItem(props) {
  const [isFollowed, setIsFollowed] = useState(props.isFollowed);

  const [selected, setSelected] = useState(props.isLiked);
  const [waiting, setWaiting] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth();

  const {execute: likePostFn } = useAsyncFn(likePost)
  const {execute: unlikePosttFn } = useAsyncFn(unlikePost)
  const {execute: manageFriendshipFn} = useAsyncFn(manageFriendship)

  const [likes, setLikes] = useState(props.likes);

  function onLikePost() {
    if(!auth.username){
      return Fail.fire()
      .then(result =>{
        if(result.isConfirmed){
          navigate('/login', { replace: true });
        }
      });
    }else{
      setWaiting(true);
      return likePostFn({ uId: auth.uId, postId: props.id })
        .then(res => {
          setSelected(true);
          setWaiting(false);
          Success.fire({
            icon: "success",
            title: "Post liked successfully",
          })
          setLikes(likes + 1);
        })
        .catch(err => {
          setWaiting(false);
        });
    }
  }

  function onUnlikePost() {
    if(!auth.username){
      return Fail.fire()
      .then(result =>{
        if(result.isConfirmed){
          navigate('/login', { replace: true });
        }
      });
    }else{
      setWaiting(true);
      return unlikePosttFn({uId: auth.uId, postId: props.id })
      .then(res => {
        setSelected(false);
        setWaiting(false);
        Success.fire({
          icon: "success",
          title: "Post unliked successfully",
        })
        setLikes(likes - 1);
      })
      .catch(() => {
        setWaiting(false);
      })
    }
  }

  function handleDeletePost(e){
    e.preventDefault();
    Swal.fire({
      title: "Are you sure you want to delete this post?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.isConfirmed) {
        props.onPostDelete({postId: props.id});
      }
    })
  }


  const handleClickFollow = () => {
    if(!auth.username){
      return Fail.fire()
      .then(result =>{
        if(result.isConfirmed){
          navigate('/login', { replace: true });
        }
      });
    }else{
      setWaiting(true);
      return manageFriendshipFn({ uId: auth.uId, targetUId: props.authorId, option: isFollowed ? "unfollow" : "follow" })
        .then(res => {
          setIsFollowed(!isFollowed);
          setWaiting(false);
          Success.fire({
            icon: "success",
            title: "Managed friendship status successfully",
          })
        })
        .catch(err => {
          setWaiting(false);
        });
    }
  };

  const FollowButton = styled(Button)(() => ({
    color: "var(--accent-bg)",
    backgroundColor: isFollowed ? "#b74a97" : "#572348",
    borderRadius: 20,
    "&:hover": {
      backgroundColor: isFollowed ? "#b74a97" : "#572348",
    },
  }));

  return (
    <Card sx={{ maxWidth: "auto", maxHeight: "md", mb: 3 }}>
      <CardHeader
        sx={{ bgcolor: "var(--accent)", borderBottom: 1 }}
        avatar={
          <Avatar
            sx={{ bgcolor: "text.secondary", ml: 1 }}
            alt={props.avatarAlt}
            src={getImage(props.avatarSrc).img}
          />
        }
        action={
          auth.uId !== props.authorId &&
          <FollowButton
            disabled={waiting || props.deletingPost}
            variant="contained"
            disableElevation
            onClick={handleClickFollow}
            key={props.id}
            sx={{ mt: 0.5, mx: 2, width: 110 }}
          >
            {isFollowed ? "FOLLOWED" : "FOLLOW" }
          </FollowButton>
        }
        title={props.username}
        subheader={props.date}
      />
      
      <CardActionArea>
        <Link to={`/post/${props.id}`} style={{ textDecoration: "none" }}>
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
              sx={{ mb: 1, fontWeight: "bold" }}
            >
              {props.title}
            </Typography>
            {!props.imgSrc && (
              <Typography
                noWrap={!props.isDetails}
                variant="body2"
                color="text.secondary"
              >
                {props.text}
              </Typography>
            )}
            {props.isDetails && props.imgSrc && (
              <Typography
                noWrap={!props.isDetails}
                variant="body2"
                color="text.secondary"
              >
                {props.text}
              </Typography>
            )}
            {props.imgSrc && (
              <CardMedia
                component="img"
                image={props.imgSrc}
                alt={props.imgAlt}
                sx={{
                  bgcolor: "var(--accent-bg)",
                  objectFit: "contain",
                  maxHeight: 270,
                }}
              />
            )}
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions sx={{ bgcolor: "var(--accent)", maxHeight: 10, pl: 2 }}>
        {props.tag ? (
          <Chip label={"#" + props.tag} component="a" onClick={() => navigate(`/forum/tag/${props.tag}`)} clickable />
        ) : null}
      </CardActions>
      <CardActions
        disableSpacing
        sx={{ bgcolor: "var(--accent)", justifyContent: "right", px: 12 }}
      >
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            selected ? onUnlikePost() : onLikePost();
          }}
          //selected={selected}
          disabled={waiting || props.deletingPost}
          sx={{ color: !selected ? "#572348" : "#b50c3b" }}
        >
          <FavoriteIcon />
        </IconButton>
        <div>{likes}</div>

        {(
          (auth.uId === props.authorId)
        ||
        (auth.role === ROLES.Admin || auth.role === ROLES.Moderator)
        )
        &&
          <IconButton
          aria-label="delete post"
          sx={{ ml: "auto" }}
          onClick={handleDeletePost}
          //selected={selected}
          disabled={waiting || props.deletingPost}
        >
          <DeleteIcon sx={{ fontSize: 40 }} />
        </IconButton>
        }

        <IconButton
          aria-label="comment"
          sx={{ ml: "auto" }}
          component={Link}
          to={`/post/${props.id}`}
        >
          <CommentIcon />
        </IconButton>
        <div>{props.comments}</div>
      </CardActions>
    </Card>
  );

}
