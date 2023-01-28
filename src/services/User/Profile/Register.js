import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { register } from "../../account.js";
import { useAsyncFn } from "../../../hooks/useAsync.js";
import { Success } from "../../../helpers/pop-ups/success";
import { CircularProgress, Button } from "@mui/material";
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';

export default function Register() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        Username: "",
        Email: "",
        Pswd: ""
    });

    const [formErrors, setFormErrors] = useState({});

    const { loading, error, execute: registerFn } = useAsyncFn(register)
    function onRegister(username, email, pswd) {
        return registerFn({ username, email, pswd })
            .then((res) => {
                if (res) {
                    console.log(res)
                    setValues({ Username: "", Email: "", Pswd: "" });
                    Success.fire({
                        icon: "success",
                        title: "Successfully registered. You can log in now.",
                    })
                    navigate('/login');
                } else {
                    let errors = {};
                    errors.Pswd = "Something is wrong on the server''s side";
                    setFormErrors(errors);
                }

            }).catch((error) => {
                console.log(error)
                let errors = {};
                if (Object.keys(error.response.data).includes("Username")) {
                    errors.Username = error.response.data.Username;
                }
                if (Object.keys(error.response.data).includes("Email")) {
                    errors.Email = error.response.data.Email;
                }
                if (Object.keys(error.response.data).includes("Pswd")) {
                    errors.Pswd = error.response.data.Pswd;
                }
                setFormErrors(errors);
            })
    }

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
        } else if (values.Pswd.length < 8 || values.Pswd.length > 30) {
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
            console.log(values)
            onRegister(values.Username, values.Email, values.Pswd)
        }
    }

    return (
        <div className="pp">
            <header className="">
                <h1 className="">
                    Register
                </h1>
                <p>
                    or <Link to={'/login'} className="">Login</Link>
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

                                <Button
                                        sx={{
                                            width: "100%",
                                            marginTop: 2
                                        }}
                                        color="secondary"
                                        disabled={loading}
                                        type="submit"
                                        startIcon={!loading && <PersonAddRoundedIcon />}
                                        variant={loading ? "outlined" : "contained"}
                                    >
                                        {loading ? <CircularProgress size={20}/> : "REGISTER"}
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