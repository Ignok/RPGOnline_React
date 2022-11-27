import React from "react";
import {
  useParams,
  Link,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Box from "@mui/material/Box";

import ReactDOM from "react-dom";
//import {createRoot} from 'react-dom/client';
import * as ReactDOMClient from "react-dom/client";
import { getPostsDetails } from "../../Api_RPGOnline";
import PostItem from "./postItem";
import { DatetimeToLocaleDateString } from "../../helpers/functions/DateTimeConverter";

import CommentItem from "../comments/commentItem";
import ReplyCommentItem from "../comments/replyCommentItem";
import { Container, Stack } from "@mui/material";

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();

  return <WrappedComponent {...props} params={params} />;
};

class PostDetails extends React.Component {
  constructor(props) {
    super(props);

    const postId = this.props.params.postId;

    console.log(postId);

    this.state = {
      postId: postId,
      post: [],
      error: null,
      isLoaded: false,
      message: null,
    };
  }

  refreshPage() {
    getPostsDetails(this.state.postId)
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({
            post: data,
            isLoaded: true,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  componentDidMount() {
    this.refreshPage();
  }

  render() {
    const { post } = this.state;
    console.log(post);
    console.log(typeof post.comments); //object

    //   console.log(Object.values(post.comments));

    // for (const [key, value] of Object.entries(post.comments)) {
    //   console.log(`${key}: ${value}`);
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
            <PostItem
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

          {post.comments === undefined
            ? console.log("loading")
            : post.comments.map((comment) => {
                return (
                  <div>
                    {comment.responseCommentId === null ? (
                      <CommentItem
                        username={comment.userResponse.username}
                        creationDate={DatetimeToLocaleDateString(
                          comment.creationDate
                        )}
                        content={comment.content}
                      />
                    ) : (
                      <ReplyCommentItem
                        username={comment.userResponse.username}
                        creationDate={DatetimeToLocaleDateString(
                          comment.creationDate
                        )}
                        content={comment.content}
                        responseUsername={comment.responseCommentId}
                      />
                    )}
                  </div>
                  // <CommentItem
                  //   username={comment.userResponse.username}
                  //   creationDate={DatetimeToLocaleDateString(comment.creationDate)}
                  //   content={comment.content}
                  // />
                );
              })}

          {/* <h2>a tu jego dane:</h2>
        <h4>postId: {post.postId}</h4>
        <h4>creationDate: {post.creationDate}</h4>
        <h4>content: {post.content}</h4> */}
          {/* <div>
          {post.comments === undefined
            ? console.log("loading")
            : post.comments.map((comment) => {
                return <div>odpowiedz od: {comment.userResponse.username}</div>;
              })}
        </div> */}
        </Container>
      </Box>
    );
  }
}

export default withRouter(PostDetails);

// export default function PostDetails() {
//   return (
//     <div>
//       <h1>POST TU JEST</h1>
//     </div>
//   );
// }
