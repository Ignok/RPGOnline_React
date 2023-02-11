import React, { useContext, useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAsync } from "../hooks/useAsync"
import { getPost } from "../services/posts"
import Swal from "sweetalert2"

const Context = React.createContext()

export function usePost() {
  return useContext(Context)
}

export function PostProvider({ children }) {
  const { postId } = useParams();

  const navigate = useNavigate();

  const { loading, error, value: post } = useAsync(() =>
    getPost(postId).catch((err) => {
      err.response?.data === "Blocked"
        &&
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `It seems like the post's author has blocked you ¯\\_(ツ)_/¯`
        })
      navigate("/forum")
    }), [postId])
  const [comments, setComments] = useState([])
  const commentsByParentId = useMemo(() => {
    const group = {}
    comments.forEach(comment => {
      group[comment.responseCommentId] ||= []
      group[comment.responseCommentId].push(comment)
    })
    return group
  }, [comments])


  useEffect(() => {
    if (post?.comments == null) return
    setComments(post.comments)
  }, [post?.comments])

  function getReplies(responseCommentId) {
    return commentsByParentId[responseCommentId]
  }

  function createLocalComment(comment) {
    setComments(prevComments => {
      return [comment, ...prevComments]
    })
  }

  function deleteLocalComment(id) {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if(comment.responseCommentId === id){
          console.log(comment)
          return {...comment, responseCommentId: null}
        } else {
          return comment
        }
      }).filter(comment => comment.commentId !== id)
    })
  }

  return (
    <Context.Provider
      value={{
        post: { postId, ...post },
        getReplies,
        rootComments: commentsByParentId[null],
        createLocalComment,
        // updateLocalComment,
        deleteLocalComment,
        // toggleLocalCommentLike,
      }}
    >
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1 className="error-msg">{error}</h1>
      ) : (
        children
      )}
    </Context.Provider>
  )
}