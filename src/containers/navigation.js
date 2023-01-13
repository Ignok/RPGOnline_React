import React, { Component, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useAsyncFn } from '../hooks/useAsync';
import { Success } from '../helpers/pop-ups/success';
import { logout } from '../services/account';
import { ROLES } from '../helpers/enums/roles'
import useAuth from '../hooks/useAuth';

export default function Navigation() {
    const { loading, error, execute: logoutFn } = useAsyncFn(logout);

    const { auth, setAuth } = useAuth();

    function onLogout() {
        return logoutFn().then((res) => {
          console.log(res);
          Success.fire({
            icon: "success",
            title: "Logout successfully",
          });
          setAuth({});
        }).catch(error => {
            console.log(error)
        });
      }

      function isLoggedIn() {
        console.log(auth)
        if(auth.username){
            return true
        } else {
            return false
        }
      }



    return (
        <Navbar bg="" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav>
                    <NavLink className='navigation-button' to='/'>
                        Home
                    </NavLink>
                    <NavLink className='navigation-button' to='/secret'>
                        SECRET
                    </NavLink>
                    <NavLink className='navigation-button' to='/users'>
                        Users
                    </NavLink>
                    <NavLink className='navigation-button' to='/forum'>
                        Forum
                    </NavLink>
                    {isLoggedIn() ? 
                    <NavLink className='navigation-button' to='/' onClick={() => onLogout() }>
                    Logout
                    </NavLink>
                    :
                    <>
                    <NavLink className='navigation-button' to='/login'>
                        Login
                    </NavLink>
                    <NavLink className='navigation-button' to='/register'>
                        Register
                    </NavLink>
                    </>
                    }
                    {/* <NavLink className='navigation-button' to='/login'>
                        Login
                    </NavLink>
                    <NavLink className='navigation-button' to='/register'>
                        Register
                    </NavLink>
                    <NavLink className='navigation-button' to='/' onClick={() => onLogout() }>
                        Logout
                    </NavLink> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}