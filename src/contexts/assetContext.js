// import React, { useContext, useEffect, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useAsync } from "../hooks/useAsync";

// import { getAssets } from "../services/assets";
// import { editSpell } from "../services/assets";

// import { item, profession, race, spell } from "../helpers/enums/assets";

// const Context = React.createContext();

// export function useAsset() {
//   return useContext(Context);
// }


// function getCategory(cat) {
//   switch (cat) {
//     case "item":
//       return item;
//     case "profession":
//       return profession;
//     case "race":
//       return race;
//     case "spell":
//       return spell;
//   }
// }

// export function AssetProvider({ children }) {
//     const { assetName } = useParams();
//     const category = getCategory(assetName);

//     const {
//       loading,
//       error,
//       value: assets,
//     } = useAsync(() => getAssets({assetName}), [assetName]);

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
