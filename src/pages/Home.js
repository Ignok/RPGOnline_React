import React, { Component } from "react";

export class Home extends Component {
  render() {
    return (
      <div>
        <div className="titleheader">
          <h1>
            Nice Dice
            <span>PLAY RPG ONLINE</span>
          </h1>
        </div>
        <h1>Welcome!</h1>
        <img
          className="scalable-photo"
          src={require("../helpers/pictures/homepage_bard.jpg")}
        />
        <h5 className="subheader">
          Make yourself comfortable and listen to the bard's singing...
        </h5>
      </div>
    );
  }
}

export default Home;
