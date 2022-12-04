import React, { Component } from "react";
import Posts from "../components/post/posts";

export class Forum extends Component {
  render() {
    return (
      //usunąc te divy?
      <div>
        <div>
          {/* <h5>Coming soon...</h5> */}
          <Posts />
        </div>
      </div>
    );
  }
}
