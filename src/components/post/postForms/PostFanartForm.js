import React, { useState, useEffect } from "react";
import { SettingsAccessibility } from "@mui/icons-material";
import { FormControl, Input, FormHelperText, InputLabel, Button, TextField, MenuItem, Link, CardMedia, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

import UploadIcon from '@mui/icons-material/Upload';

import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';


import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

import successfulGif from "../../../helpers/pictures/post_added_successfully.gif";
import useAuth from "../../../hooks/useAuth";

import { createFanart, createPost } from "../../../services/posts";
import { useAsyncFn } from "../../../hooks/useAsync";

import uploadFileToBlob from "../../../helpers/functions/azure-storage-blob";
import { getBlobsInContainer } from "../../../helpers/functions/azure-storage-blob";
import { Success } from "../../../helpers/pop-ups/success";




const tags = [
    {
        value: 'none',
        label: 'None of the following'
    },
    {
        value: 'fanart',
        label: 'Fanart'
    },
    {
        value: 'cosplay',
        label: 'Cosplay'
    },
    {
        value: 'notive',
        label: 'Notice',
        role: 'admin'
    },
];


export default function PostFanartFrom() {
    const { auth } = useAuth();
    const navigate = useNavigate();


    const reader = new FileReader()

    const [imageURL, setImageURL] = useState()

    const [file, setFile] = useState()

    const [values, setValues] = useState({
        Title: "",
        Tag: "none",
        Content: ""
    });

    const { execute: createFanartFn } = useAsyncFn(createFanart);

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

        if (!file) {
            errors.Picture = "Picture is required";
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    const [uploading, setUploading] = useState(false);

    async function onFileUpload() {

        setUploading(true)

        const res = await uploadFileToBlob(file, auth.uId).then((res) => {
            return res._response.request.url;
        }).catch((err) => {
            console.log(err)
            Promise.reject(err)
        });

        console.log(res)
        return res;

    };

    async function onChooseImage(e) {
        e.preventDefault();
        const { value: file } = await Swal.fire({
            title: 'Select image',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Upload your profile picture'
            }
        })

        if (file) {
            //console.log(file);
            reader.onload = (e) => {
                setImageURL(e.target.result);
            }
            setFile(file)
            reader.readAsDataURL(file)
        }
    }

    async function handleSubmit(event) {
        if (event) event.preventDefault();
        if (validateForm(values)) {
            const url = await onFileUpload()
            if (url) {
                createFanartFn({
                    uId: auth.uId,
                    title: values.Title,
                    content: values.Content,
                    tag: values.Tag,
                    picture: url
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
                    setUploading(false)
                    navigate('/forum');
                }).catch(e => {
                    console.log("oops")
                    console.log(e)
                    Success.fire({
                        icon: "error",
                        title: "Something went wrong with uploading",
                    });
                    setUploading(false)
                })
            }
        }
    }


    return (
        <Box>
            <Button onClick={() => navigate('/forum')}>Back</Button>

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
                <FormControl>
                    <Box
                        sx={{
                            p: 1,
                            m: 2,
                            border: '1px dashed grey',
                            display: 'grid',
                            justifyContent: 'center'
                        }}
                    >
                        <Button key={"picture"} size="large" onClick={onChooseImage}>
                            Select picture
                        </Button>
                        {imageURL !== undefined &&
                            <CardMedia
                                component="img"
                                image={imageURL}
                                alt={"picture"}
                                sx={{
                                    bgcolor: "var(--accent-bg)",
                                    // padding: "1em 1em 1em 1em",
                                    objectFit: "contain",
                                    maxHeight: 270,
                                }}
                            />
                        }
                    </Box>
                    {
                        formErrors.Picture && (
                            <p className="text-warning">{formErrors.Picture}</p>
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
                    {tags.filter((tag) => !tag.role || tag.role === auth.role).map((tag) => (
                        <MenuItem key={tag.value} value={tag.value}>
                            {tag.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Button
                    sx={{
                        width: "100%",
                        marginTop: 2,
                        marginBottom: 5,
                    }}
                    color="secondary"
                    disabled={uploading}
                    type="submit"
                    startIcon={!uploading && <UploadIcon />}
                    variant={uploading ? "outlined" : "contained"}
                >
                    {uploading ? <CircularProgress size={20} /> : "Submit"}
                </Button>
            </Box>
        </Box>
    );
}