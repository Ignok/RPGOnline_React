import React, { useState } from "react";
import { useAsyncFn } from "../../../hooks/useAsync.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { login } from "../../account.js";
import useAuth from "../../../hooks/useAuth.js";
import { CircularProgress, Button } from "@mui/material";
import { LoginRounded } from "@mui/icons-material";


export default function Login() {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const { loading, error, execute: loginFn } = useAsyncFn(login)
    function onLogin(username, pswd) {
        return loginFn({ username, pswd })
            .then(res => {
                if (res) {
                    const uId = res?.uId;
                    const username = res?.username;
                    const role = res?.userRole;
                    const avatar = res?.avatar;

                    setAuth({ uId, username, role, avatar });
                    setValues({ Username: "", Pswd: "" });
                    localStorage.setItem("isLoggedIn", true)

                    navigate(from, { replace: true });
                } else {
                    let errors = {};
                    errors.Pswd = "Something is wrong on the server''s side";
                    setFormErrors(errors);
                }

            }).catch(() => {
                let errors = {};
                errors.Pswd = "Invalid username or password";
                setFormErrors(errors);
            })
    }


    const [values, setValues] = useState({
        Username: "",
        Pswd: ""
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (event) => {

        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

    function validateForm() {
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
            <div className="">
                <header className="">
                    <h1 className="">
                        Login
                    </h1>
                    <p>
                        or <Link to={'/register'} className="">Register</Link>
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

                                    <Button
                                        sx={{
                                            width: "100%",
                                            marginTop: 2
                                        }}
                                        color="secondary"
                                        disabled={loading}
                                        type="submit"
                                        startIcon={!loading && <LoginRounded />}
                                        variant={loading ? "outlined" : "contained"}
                                    >
                                        {loading ? <CircularProgress size={20}/> : "LOGIN"}
                                    </Button>

                                </Form>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                </Container>
            </div>
        </>
    );
}