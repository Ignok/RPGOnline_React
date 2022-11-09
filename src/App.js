//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {Home} from './Home'
import {Users} from './Users'
import {Forum} from './Forum'
import {Navigation} from './Navigation'

import {Link, BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <div className="titleheader">
        <h1>NiceDice
          <span>
            RPG Online
          </span>
        </h1>
      </div>

      <h3 className="m-3 d-flex justify-content-center">
        
        </h3>

        <Navigation/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/forum' element={<Forum/>}/>
        </Routes>
    </div>
    <footer>&copy;2022 Bok&Akahori</footer>
    </BrowserRouter>
  );
}

export default App;
