import "./App.css";
import React from "react";
import Home from "./pages/Home";
import UsersList from "./components/users/users";
import { Forum } from "./pages/Forum";
import { Profile } from "./pages/Profile";
import { AssetMarket } from "./pages/Market";
import Register from "./services/User/Profile/Register";
import Login from "./services/User/Profile/Login";
import PostDiscussionForm from "./components/post/postForms/PostDiscussionForm";
import SpellForm from "./components/market/create/spellForm";
import ItemForm from "./components/market/create/itemForm";
import RaceForm from "./components/market/create/raceForm";
import ProfessionForm from "./components/market/create/professionForm";
import CharacterForm from "./components/market/create/character/playableForm";
import UnplayableForm from "./components/market/create/character/unplayableForm";
import { PostProvider } from "./contexts/postContext";
import { PostDetails } from "./components/post/postDetails";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/userContext";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import { ROLES } from "./helpers/enums/roles";
import PersistLogin from "./components/PersistLogin";
import AboutMeContents from "./components/userprofile/contents/aboutme/aboutMe";
import FriendsContents from "./components/userprofile/contents/friends/friends";
import MessagesContents from "./components/userprofile/contents/messages/messages";
import Posts from "./components/post/posts";
import PostFanartFrom from "./components/post/postForms/PostFanartForm";
import WorkInProgressContents from "./components/userprofile/contents/inprogress/workInProgress";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}>
          
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<Home />} />

          <Route path="/forum" element={<Forum />}>
              <Route index element={<Posts />} />
              <Route path=":option" element={<Posts />} />
              <Route path="tag/:tagName" element={<Posts />} />
          </Route>

          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.Admin, ROLES.User, ROLES.Moderator]}
              />
            }
          >
            <Route path="/users" element={<UsersList />} />
            <Route
              path="/post/discussion-form"
              element={<PostDiscussionForm />}
            />
            <Route
              path="/post/fanart-form"
              element={<PostFanartFrom />}
            />

            {/* USER'S PROFILE */}
            <Route
              path="/profile/:uId"
              element={
                <UserProvider>
                  <Profile />
                </UserProvider>
              }
            >
              <Route index element={<AboutMeContents />} />
              <Route path="about" element={<AboutMeContents />} />
              <Route path="messages" element={<MessagesContents />} />
              <Route path="friends" element={<FriendsContents />} />
              <Route path="achievements" element={<WorkInProgressContents />} />
              <Route path="statistics" element={<WorkInProgressContents />} />
              <Route path="settings" element={<WorkInProgressContents />} />
            </Route>
          </Route>

          {/* ASSETS */}
          <Route path="/assets" element={ <AssetMarket /> } >
              <Route index element={<AssetMarket />} />
              <Route path=":option" element={<AssetMarket />} />
              <Route path="character/:type" element={<AssetMarket />} />
          </Route>
          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.Admin, ROLES.User, ROLES.Moderator]}
              />
            }
          >
            <Route path="/assets/create/spell" element={<SpellForm />} />
            <Route path="/assets/create/item" element={<ItemForm />} />
            <Route path="/assets/create/race" element={<RaceForm />} />
            <Route path="/assets/create/profession" element={<ProfessionForm />} />
            <Route path="/assets/create/playable" element={<CharacterForm />} />
            <Route path="/assets/create/npc" element={<UnplayableForm type={"npc"} />} />
            <Route path="/assets/create/monster" element={<UnplayableForm type={"monster"} />} />
          </Route>

          <Route
            path="/post/:postId"
            element={
              <PostProvider>
                <PostDetails />
              </PostProvider>
            }
          />
          
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
