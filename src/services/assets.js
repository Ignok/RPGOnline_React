import { makeRequest } from "./makeRequest";

// export function getAssets({ assetName }) {
//   console.log({ assetName });
//   return makeRequest(`Race`, {
//     method: "GET",
//     //signal: controller.signal
//   });
// }

export function createSpell({
  uId,
  language,
  isPublic,
  name,
  description,
  keySkill,
  minValue,
  manaCost,
  effects,
}) {
  return makeRequest(`Spell`, {
    method: "POST",
    withCredentials: true,
    data: {
      uId: uId,
      isPublic: isPublic,
      language: language,
      name: name,
      description: description,
      keySkill: keySkill,
      minValue: minValue,
      manaCost: manaCost,
      effects: effects,
    },
  });
}