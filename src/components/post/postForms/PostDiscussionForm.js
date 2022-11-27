import React, { useState } from "react";
import { SettingsAccessibility } from "@mui/icons-material";
import { FormControl, Input, FormHelperText, InputLabel, Button, TextField, MenuItem, Link } from "@mui/material";
import { Box } from "@mui/system";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

import successfulGif from "../../../helpers/pictures/post_added_successfully.gif";


const BASE_URL = 'https://localhost:7251/api/Posts';

const tags = [
    {
        value: 'none',
        label: 'None of the following',
    },
    {
        value: 'lore',
        label: 'Lore',
    },
    {
        value: 'help',
        label: 'Help',
    },
];


export default function PostDiscussionForm() {

    const [values, setValues] = useState({
        UId: 1, // To weźmiemy po zalogowaniu
        Title: "",
        Tag: "none",
        Content: ""
    });


    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState({});


    const handleChange = (event) => {
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };


    function validateForm() {
        console.log("Validate the form....");

        let errors = {};

        //title field
        if (!values.Title) {
            errors.Title = "Title is required";
        }

        //content field
        if (!values.Content) {
            errors.Content = "Content is required";
        }

        //censor bad words

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

            axios.post(BASE_URL, values, {
                headers: { 'Content-Type': 'application/json' },
            }).then(res => {
                console.log(res.data);
                Swal.fire({
                    title: 'Your post was added successfully!',
                    width: 450,
                    padding: '3em',
                    color: '#716add',
                    imageUrl: successfulGif,
                    imageWidth: "100%",
                    imageHeight: "100%",
                    imageAlt: 'success image',
                    backdrop: `rgba(0,0,123,0.4)`
                })
                navigate('/forum');
            }).catch(e => {
                console.log(e)
            })
        }
    }


    return (
        <Box>
            <Button href='/forum'>Back</Button>

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '50vw' },

                    display: 'grid',
                    justifyContent: 'center'
                }}
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <FormControl>
                    <InputLabel>UID</InputLabel>
                    <Input
                        id="UId"
                        name="UId"
                        type="number"
                        aria-describedby="my-helper-text"
                        inputProps={{ maxLength: 40 }}
                        onChange={handleChange}
                        value={values.UId}
                    />
                </FormControl>

                <FormControl>
                    <InputLabel>Title</InputLabel>
                    <Input
                        id="Title"
                        name="Title"
                        aria-describedby="my-helper-text"
                        inputProps={{ maxLength: 40 }}
                        onChange={handleChange}
                        value={values.Title}
                    />
                    {
                        formErrors.Title && (
                            <p className="text-warning">{formErrors.Title}</p>
                        )
                    }
                </FormControl>

                <FormControl>
                    <TextField
                        id="Content"
                        name="Content"
                        label="Content"
                        multiline
                        rows={10}
                        inputProps={{ maxLength: 1080 }}
                        onChange={handleChange}
                        value={values.Content}
                    />
                    {
                        formErrors.Content && (
                            <p className="text-warning">{formErrors.Content}</p>
                        )
                    }
                </FormControl>

                <TextField
                    select
                    id="Tag"
                    name="Tag"
                    label="Tag"
                    value={values.Tag}
                    onChange={handleChange}
                    helperText="Choose the tag that best fits your post"
                    variant="standard"
                >
                    {tags.map((tag) => (
                        <MenuItem key={tag.value} value={tag.value}>
                            {tag.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Button type="submit" >Submit</Button>
            </Box>
        </Box>
    );
}