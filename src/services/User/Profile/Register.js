import React, { useState } from "react";

import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import { register } from "../../../Api_RPGOnline.js";

//import "./Login.css";

export default function Register() {


    const [values, setValues] = useState({
        Username: "",
        Email: "",
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

        //email field
        if (!values.Email) {
            errors.Email = "Email is required";
        } else if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(values.Email)) {
            errors.Email = "Email address is invalid";
        }

        //password field
        if (!values.Pswd) {
            errors.Pswd = "Password is required";
        } else if(values.Pswd.length < 8 || values.Pswd.length > 30){
            errors.Pswd = "Password must have min of 8 and max of 30 characters";
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
                Email: values.Email,
                Pswd: values.Pswd
            }
            console.log(data);
            let response;
            let promise;
            promise = register(data);
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
                            if (response.status === 400) {
                                let errors = {};

                                if (Object.keys(data).includes("Username")){
                                    errors.Username = data.Username;
                                }
                                if (Object.keys(data).includes("Email")){
                                    errors.Email = data.Email;
                                }
                                if (Object.keys(data).includes("Pswd")){
                                    errors.Pswd = data.Pswd;
                                }

                                setFormErrors(errors);
                            }
                            if (response.status === 200) { //rejestracja poprawna
                                const userString = JSON.stringify(data);
                                console.log(userString);
                            }
                        },
                        (error) => {
                            console.log("error");
                            console.log(error);
                            setError(error);
                        })
            }
        }
    }

    return (
        <div className="App">
            <header className="App-header">
            <h1 className=""> {/* Do uzupełnienia className */}
                    Register
                </h1>
                <p>
                    or <Link to={'/login'} className="">Login</Link> {/* Do uzupełnienia className */}
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

                                <Form.Group size="lg" controlId="Email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="email"
                                        name="Email"
                                        value={values.Email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                    />
                                    {
                                        formErrors.Email && (
                                            <p className="text-warning">{formErrors.Email}</p>
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