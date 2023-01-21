import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { getUser } from "../services/users";

const Context = React.createContext();

export function AssetProvider({ children }) {
    const { uId } = useParams();
    const { loading, error, value: user } = useAsync(() => getUser(uId), [uId]);

    return (
      <Context.Provider
        value={{
          user: { uId, ...user },
        }}
      >
        {loading ? (
          <h1>Loading</h1>
        ) : error ? (
          <h1 className="error-msg">{error}</h1>
        ) : (
          children
        )}
      </Context.Provider>
    );
}