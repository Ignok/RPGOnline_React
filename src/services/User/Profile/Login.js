//Login.js

import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../contexts/AuthProvider.js";

import { useAsyncFn } from "../../../hooks/useAsync.js";

import { Link, useNavigate, useLocation } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import { useCookies } from 'react-cookie'
import axios from 'axios';
import { login } from "../../account.js";
import useRefreshToken from "../../../hooks/useRefreshToken.js";
import useAuth from "../../../hooks/useAuth.js";


export default function Login() {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    
    const { loading, error, execute: loginFn } = useAsyncFn(login)
    function onLogin(username, pswd) {
        return loginFn({ username, pswd })
            .then(res => {
                console.log(location)
                console.log(res)

                const uId = res?.uId;
                const username = res?.username;
                const role = res?.userRole;

                setAuth({ uId, username, role});

                setValues({ Username: "", Pswd: "" });

                navigate(from, { replace: true });

                //setSuccess(true)
            }).catch(error => {
                console.log(error)
                let errors = {};
                errors.Pswd = "Invalid username or password";
                setFormErrors(errors);
            })
    }


    const [values, setValues] = useState({
        Username: "",
        Pswd: ""
    });

    const [success, setSuccess] = useState(false);

    const [formErrors, setFormErrors] = useState({});

    const [Error, setError] = useState("");


    const handleChange = (event) => {

        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

    function validateForm() {
        console.log("Validate the form....");

        let errors = {};

        //username field
        if (!values.Username) {
            errors.Username = "Username is required";
        }

        //password field
        if (!values.Pswd) {
            errors.Pswd = "Password is required";
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    function handleSubmit(event) {
        if (event) event.preventDefault();
        if (validateForm(values)) {
            onLogin(values.Username, values.Pswd)
        }
    }

    return (
        <>
            {/* {success ?
                (
                    <div>
                        <h1>You are logged in!</h1>
                        <br />
                        <p>
                            <a href="/">Go to Home page</a>
                        </p>
                    </div>
                )
                :
                ( */}
                    <div className="">
                        <header className="">
                            <h1 className=""> {/* Do uzupełnienia className */}
                                Login
                            </h1>
                            <p>
                                or <Link to={'/register'} className="">Register</Link> {/* Do uzupełnienia className */}
                            </p>
                        </header>
                        <Container className="p-3">
                            <Container>
                                <Row>
                                    <Col>{error}</Col>
                                    <Col>
                                        <Form onSubmit={handleSubmit}>

                                            <Form.Group size="lg" controlId="Username">
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control
                                                    autoFocus
                                                    type="text"
                                                    name="Username"
                                                    value={values.Username}
                                                    onChange={handleChange}
                                                    placeholder="Enter your username"
                                                />
                                                {
                                                    formErrors.Username && (
                                                        <p className="text-warning">{formErrors.Username}</p>
                                                    )
                                                }
                                            </Form.Group>

                                            <Form.Group size="lg" controlId="Pswd">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="Pswd"
                                                    value={values.Password}
                                                    onChange={handleChange}
                                                    placeholder="Enter your password"
                                                />
                                                {
                                                    formErrors.Pswd && (
                                                        <p className="text-warning">{formErrors.Pswd}</p>
                                                    )
                                                }
                                            </Form.Group>

                                            <Button block="true" size="lg" type="submit">
                                                Login
                                            </Button>

                                        </Form>
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Container>
                        </Container>
                    </div>
                {/* )
            } */}
        </>
    );
}