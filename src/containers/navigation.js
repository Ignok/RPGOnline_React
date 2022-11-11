import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export class Navigation extends Component{

    render(){
        return(
            <Navbar bg="" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav>
                        <NavLink className='navigation-button' to='/'>
                            Home
                        </NavLink>
                        <NavLink className='navigation-button' to='/users'>
                            Users
                        </NavLink>
                        <NavLink className='navigation-button' to='/forum'>
                            Forum
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}