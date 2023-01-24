// import React, { useContext, useEffect, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useAsync } from "../hooks/useAsync";

// const Context = React.createContext();

// export function useAsset() {
//   return useContext(Context);
// }

// export function AssetProvider({ children }) {
//     const { assetName } = useParams();

//     const { loading, error, value: assets } = useAsync(() => getAsset(assetName), [assetName]);

//     return (
//       <Context.Provider
//         value={{
//           assets: { assetName, ...assets },
//         }}
//       >
//         {loading ? (
//           <h1>Loading</h1>
//         ) : error ? (
//           <h1 className="error-msg">{error}</h1>
//         ) : (
//           children
//         )}
//       </Context.Provider>
//     );
// }