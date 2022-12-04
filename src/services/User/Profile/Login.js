//Login.js

import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../contexts/AuthProvider.js";

import { useAsyncFn } from "../../../hooks/useAsync.js";

import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import { useCookies } from 'react-cookie'

import { login } from "../../account.js";
import useRefreshToken from "../../../hooks/useRefreshToken.js";

//import "./Login.css";

export default function Login() {

    const { setAuth } = useContext(AuthContext);

    const refreshToken = useRefreshToken();

    const { loading, error, execute: loginFn } = useAsyncFn(login)
    function onLogin(username, pswd) {
        return loginFn({ username, pswd })
            .then(res => {
                console.log(res.headers)

                // const accessToken = res.accessToken;
                // //const roles = res.roles;
                // const refreshToken = res.refreshToken;

                // console.log(accessToken)
                // console.log(refreshToken)
                // setAuth({ username: values.Username, Pswd: values.Pswd, accessToken, refreshToken });
                // setValues({ Username: "", Pswd: "" });
                // setSuccess(true)
            }).catch(error => {
                console.log(error)
                let errors = {};
                errors.Pswd = "Invalid username or password";
                setFormErrors(errors);
            })
    }

    // useEffect(() => {

    // }, [])


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


            // const data = {
            //     Username: values.Username,
            //     Pswd: values.Pswd
            // }
            // console.log(data);
            // let response;
            // let promise;
            // promise = login(data);
            // if (promise) {
            //     promise
            //         .then(res => {
            //             console.log(res)
            //             response = res
            //             return res.json()
            //         })
            //         .then(
            //             (data) => {
            //                 console.log(data)
            //                 if (response.status === 400) {
            //                     let errors = {};
            //                     errors.Pswd = data.errorMessage;
            //                     setFormErrors(errors);
            //                 }
            //                 if (response.status === 200) { //logowanie poprawne
            //                     const userString = JSON.stringify(data);
            //                     setSuccess(true)
            //                     console.log(userString);
            //                 }
            //             },
            //             (error) => {
            //                 console.log(error)
            //             })
            // }
        }
    }

    return (
        <>
            {success ?
                (
                    <div>
                        <h1>You are logged in!</h1>
                        <br />
                        <p>
                            <a href="/">Go to Home page</a>
                        </p>
                        <button className="button-add" type="button" onClick={() => refreshToken()}>
                            Refresh token
                        </button>
                    </div>
                )
                :
                (
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
                )
            }
        </>
    );
}