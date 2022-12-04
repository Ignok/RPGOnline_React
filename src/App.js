//import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import React, { Component } from "react";
import { Home } from "./pages/Home";
import { UsersList } from "./services/User/UsersList";
import { Forum } from "./pages/Forum";
import { Profile } from "./pages/Profile";
import Register from "./services/User/Profile/Register";
import Login from "./services/User/Profile/Login";
import PostDiscussionForm from "./components/post/postForms/PostDiscussionForm";
import { PostProvider } from "./contexts/postContext";
import { PostDetails } from "./components/post/postDetails";

import { Navigation } from "./containers/navigation";

import { FooterContainer } from "./containers/footer";

import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import AboutMeDetails from "./services/User/Profile/AboutMeDetails";
import { UserProvider } from "./contexts/userContext";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="titleheader">
            <h1>
              Nice Dice
              <span>PLAY RPG ONLINE</span>
            </h1>
          </div>

          <Navigation />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UsersList />} />

              <Route path="/forum" element={<Forum />} />
              <Route
                path="/post/:postId"
                element={
                  <PostProvider>
                    <PostDetails />
                  </PostProvider>
                }
              />
              {/* <Route path='/post/:postId' element={<PostDetails />} /> */}
              <Route
                path="/post/discussion-form"
                element={<PostDiscussionForm />}
              />

              <Route
                path="/aboutme/:uId"
                element={
                  <UserProvider>
                    <Profile />
                  </UserProvider>
                }
              />
              <Route
                path="/aboutme/details/:uId"
                element={<AboutMeDetails />}
              />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
        <FooterContainer />
      </BrowserRouter>
    );
  }
}

export default App;
