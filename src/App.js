//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {Home} from './Home'
import {Users} from './User/Users'
import {Forum} from './Forum'
import { AboutMe } from './User/Profile/AboutMe';

import {Navigation} from './Helpers/Navigation';

import {Footer} from './Helpers/Footer';

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

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/forum' element={<Forum/>}/>
          <Route path='/aboutme' element={<AboutMe/>}/>
        </Routes>

        
    </div>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
