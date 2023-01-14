//import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import React, { Component } from "react";
import { Home } from "./pages/Home";
import UsersList from "./components/users/users";
import { Forum } from "./pages/Forum";
import { Profile } from "./pages/Profile";
import Register from "./services/User/Profile/Register";
import Login from "./services/User/Profile/Login";
import PostDiscussionForm from "./components/post/postForms/PostDiscussionForm";
import { PostProvider } from "./contexts/postContext";
import { PostDetails } from "./components/post/postDetails";
import { Link, BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AboutMeDetails from "./services/User/Profile/AboutMeDetails-old";
import { UserProvider } from "./contexts/userContext";
import AdminPage from "./pages/AdminPage";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import { ROLES } from "./helpers/enums/roles";




function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route path="/" element={<Home />} />

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin, ROLES.Moderator]} />}>
              <Route path="/users" element={<UsersList />} />
            </Route> */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User, ROLES.Moderator]}/> }>
          <Route path="/users" element={<UsersList />} />
          <Route path="/post/discussion-form" element={<PostDiscussionForm />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/> }>
          <Route path="/secret" element={<AdminPage />} />
        </Route>

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
        
        {/* <Route path="/post/discussion-form" element={<PostDiscussionForm />} /> */}

        <Route
          path="/aboutme/:uId"
          element={
            <UserProvider>
              <Profile />
            </UserProvider>
          }
        />
      </Route>
    </Routes>
   
  );
}

export default App;
