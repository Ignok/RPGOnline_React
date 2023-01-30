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

export default function UsersList() {
  const [users, setUsers] = useState();

  const { auth } = useAuth();


  const { loading, error, execute: getUsersFn } = useAsyncFn(getUsers);

  useEffect(() => {
    getUsersFn().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <Box
      sx={{
        pt: 2,
        pb: 10,
      }}
    >
      <UserNav />
      {loading ? (
        <h1>Loading . . .</h1>
      ) : users?.length ? (
        <Grid
          container
            spacing={{ md: 2, lg: 3 }}
          columns={{ md: 4, lg: 12 }}
          justifyContent="center"
        >
          {users.filter((user) => user.uId != auth.uId).map((user) => (
            <UserItem key={user.uId} user={user} />
          ))}
        </Grid>
      ) : (
        <h1>No users to display</h1>
      )}
    </Box>
  );
}
