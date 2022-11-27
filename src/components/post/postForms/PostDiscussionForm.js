import React from "react";
import { SettingsAccessibility } from "@mui/icons-material";
import { FormControl, Input, FormHelperText, InputLabel, Button, TextField, MenuItem } from "@mui/material";
import { Box } from "@mui/system";


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
        value: 'notice',
        label: 'Notice',
    },
    {
        value: 'help',
        label: 'Help',
    },
];

export default function PostDiscussionForm() {
    const [tag, setTag] = React.useState('none');

    function handleSubmit(event) {
        if (event) event.preventDefault();
        console.log("SUBMIT");
        // if (validateForm(values)) {
        //     const data = {
        //         Username: values.Username,
        //         Pswd: values.Pswd
        //     }
        //     console.log(data);
        //     let response;
        //     let promise;
        //     promise = login(data);
        //     if (promise) {
        //         promise
        //             .then(res => {
        //                 console.log(res)
        //                 response = res
        //                 return res.json()
        //             })
        //             .then(
        //                 (data) => {
        //                     console.log(data)
        //                     if (response.status === 401) {
        //                         console.log(response);
        //                         let errors = {};
        //                         errors.Pswd = "Username or password is invalid";
        //                         setFormErrors(errors);
        //                     }
        //                     if (response.status === 200) { //logowanie poprawne
        //                         const userString = JSON.stringify(data);
        //                         console.log(userString);
        //                     }
        //                 },
        //                 (error) => {
        //                     setError(error)
        //                 })
        //     }
        // }
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
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <FormControl>
                    <InputLabel htmlFor="title">Title</InputLabel>
                    <Input id="title" aria-describedby="my-helper-text" inputProps={{ maxLength: 40 }}/>
                </FormControl>

                <FormControl>
                    <TextField
                        id="content"
                        label="Content"
                        multiline
                        rows={10}
                        inputProps={{ maxLength: 1080 }}
                    />
                </FormControl>

                <TextField
                    id="tag"
                    select
                    label="Tag"
                    value={tag}
                    onChange={(e) => { setTag(e.target.value) }}
                    helperText="Choose the tag that best fits your post"
                    variant="standard"
                >
                    {tags.map((tag) => (
                        <MenuItem key={tag.value} value={tag.value}>
                            {tag.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Button type="submit">Submit</Button>
            </Box>
        </Box>
    );
}