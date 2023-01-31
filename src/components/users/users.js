import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/users";
import { useAsyncFn } from "../../hooks/useAsync";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import useRefreshToken from "../../hooks/useRefreshToken";
import Box from "@mui/material/Box";
import { getImage } from "../../helpers/functions/getImage";
import Grid from "@mui/material/Unstable_Grid2";
import UserItem from "./userItem";
import UserNav from "./usersNav";
import useAuth from "../../hooks/useAuth";
import useFetchUsers from "../../helpers/functions/useFetchUsers";

export default function UsersList() {
  const [params, setParams] = useState({})
  const [attitude, setAttitude] = useState("");
  const [rating, setRating] = useState(0)
  //const [page, setPage] = useState(1)
  const { users, loading, error } = useFetchUsers(params, attitude, rating);



  const { auth } = useAuth();

  function handleRatingChange(e) {
    e.preventDefault();
    console.log(e)
    //setRating
  }
  function handleAttitudeChange(e) {
    e.preventDefault();
    const value = e.target.value
    setAttitude(value)
  }

  function handleParamChange(e) {
    e.preventDefault();
    console.log(e)
    const param = e.target.name
    const value = e.target.value
    console.log("--------")
    console.log(param)
    console.log(value)
    //setPage(1)
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    })
  }

  // const { loading, error, execute: getUsersFn } = useAsyncFn(getUsers);

  // useEffect(() => {
  //   getUsersFn().then((data) => {
  //     setUsers(data);
  //   });
  // }, []);

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
          {/* .filter((user) => user.uId != auth.uId) */}
          {users.map((user) => (
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
