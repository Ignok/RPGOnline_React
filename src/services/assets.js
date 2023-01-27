import { makeRequest } from "./makeRequest";

// export function getAssets({ assetName }) {
//   console.log({ assetName });
//   return makeRequest(`Race`, {
//     method: "GET",
//     //signal: controller.signal
//   });
// }

export function saveAsset({
  uId,
  assetId
}) {
  return makeRequest(`Users/${uId}/Assets/${assetId}`, {
    method: "POST",
    withCredentials: true,
  });
}

export function unsaveAsset({
  uId,
  assetId
}) {
  return makeRequest(`Users/${uId}/Assets/${assetId}`, {
    method: "DELETE",
    withCredentials: true,
  });
}

export function createItem({
  uId,
  isPublic,
  language,
  name,
  description,
  keySkill,
  skillMod,
  goldMultiplier,
}) {
  return makeRequest(`Item`, {
    method: "POST",
    withCredentials: true,
    data: {
      uId: uId,
      isPublic: isPublic,
      language: language,
      name: name,
      description: description,
      keySkill: keySkill,
      skillMod: skillMod,
      goldMultiplier: goldMultiplier,
    },
  });
}

export function createRace({
  uId,
  isPublic,
  language,
  name,
  description,
  talent,
  hiddenTalent,
  keyAttribute,
}) {
  return makeRequest(`Race`, {
    method: "POST",
    withCredentials: true,
    data: {
      uId: uId,
      isPublic: isPublic,
      language: language,
      name: name,
      description: description,
      talent: talent,
      hiddenTalent: hiddenTalent,
      keyAttribute: keyAttribute,
    },
  });
}

export function createSpell({
  uId,
  isPublic,
  language,
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