import React, { useContext, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { useAsync } from "../hooks/useAsync"
import { getPost } from "../services/posts"

const Context = React.createContext()

export function usePost() {
  return useContext(Context)
}

export function PostProvider({ children }) {
  const { postId } = useParams()
  const { loading, error, value: post } = useAsync(() => getPost(postId), [postId])
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

  return (
    <Context.Provider
      value={{
        post: { postId, ...post },
        getReplies,
        rootComments: commentsByParentId[null],
        createLocalComment,
        // updateLocalComment,
        // deleteLocalComment,
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