import React, { useState } from "react";

import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import { login } from "../../../Api_RPGOnline.js";

//import "./Login.css";

export default function Login() {


    const [values, setValues] = useState({
        Username: "",
        Pswd: ""
    });

    const [formErrors, setFormErrors] = useState({});

    const [Error, setError] = useState("");


    const handleChange = (event) => {
        // console.log(
        //     "handleChange -> " + event.target.name + " : " + event.target.value
        // );

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
            const data = {
                Username: values.Username,
                Pswd: values.Pswd
            }
            console.log(data);
            let response;
            let promise;
            promise = login(data);
            if (promise) {
                promise
                    .then(res => {
                        console.log(res)
                        response = res
                        return res.json()
                    })
                    .then(
                        (data) => {
                            console.log(data)
                            if (response.status === 401) {
                                console.log(response);
                                let errors = {};
                                errors.Pswd = "Username or password is invalid";
                                setFormErrors(errors);
                            }
                            if (response.status === 200) { //logowanie poprawne
                                const userString = JSON.stringify(data);
                                console.log(userString);
                            }
                        },
                        (error) => {
                            setError(error)
                        })
            }
        }
    }

    return (
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
                        <Col></Col>
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
    );
}