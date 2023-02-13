import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import UserItem from "./userItem";
import UserNav from "./usersNav";
import useFetchUsers from "../../helpers/functions/useFetchUsers";

export default function UsersList() {
  const [params, setParams] = useState({})
  const [attitude, setAttitude] = useState("");
  const [rating, setRating] = useState(0)
  
  const { users, loading } = useFetchUsers(params, attitude);

  function handleRatingChange(e) {
    e.preventDefault();
    setRating(e.target.value);
  }
  function handleAttitudeChange(e) {
    e.preventDefault();
    const value = e.target.value
    setAttitude(value)
  }

  function handleParamChange(e) {
    e.preventDefault();
    const param = e.target.name
    const value = e.target.value
    
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    })
  }


  return (
    <Box
      sx={{
        pt: 2,
        pb: 10,
      }}
    >
      <UserNav
        params={params}
        attitude={attitude}
        rating={rating}
        onParamChange={handleParamChange}
        onAttitudeChange={handleAttitudeChange}
        onRatingChange={handleRatingChange}
      />
      {loading ? (
        <h1>Loading . . .</h1>
      ) : users?.length ? (
        <Grid
          container
          spacing={{ md: 2, lg: 3 }}
          columns={{ md: 4, lg: 12 }}
          justifyContent="center"
        >
          {users
            .filter((user) => user.averageRating >= rating)
            .map((user) => (
            <UserItem key={user.uId} user={user} />
          ))}
        </Grid>
      ) : 
      (
        <h1>No users to display</h1>
      )}
    </Box>
  );
}
