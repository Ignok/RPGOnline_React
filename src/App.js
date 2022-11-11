//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Component }  from 'react';
import {Home} from './Home'
import {Users} from './services/User/Users'
import {Forum} from './services/Forum'
import  AboutMe from './services/User/Profile/AboutMe';

import {Navigation} from './containers/navigation';

import {FooterContainer} from './containers/footer'

import {Link, BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <div className="titleheader">
        <h1>Nice Dice
          <span>
            PLAY RPG ONLINE
          </span>
        </h1>
      </div>

        <Navigation/>

        <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/forum' element={<Forum/>}/>
          <Route path='/aboutme/:uId' element={<AboutMe/>}/>
        </Routes>
        </main>
      
      </div>
    <FooterContainer/>
    </BrowserRouter>
  );
}

export default App;
