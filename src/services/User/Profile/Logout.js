import React from "react";
import { logout } from "../../account";
import { Success } from "../../../helpers/pop-ups/success";
import { useAsyncFn } from "../../../hooks/useAsync";

export default function Logout() {
  const { loading, error, execute: logoutFn } = useAsyncFn(logout);
  console.log("DUPA1")

  function onLogout() {
    console.log("DUPA2")
    return logoutFn().then((res) => {
        console.log("DUPA3")
      console.log(res);
      Success.fire({
        icon: "success",
        title: "Logout successfully",
      });
      window.location.href = "/"
    }).catch(error => {
        console.log(error)
    });
  }

  return (onLogout());
}
