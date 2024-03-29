import { makeRequest } from "./makeRequest";


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


export function getSpellsForCharacter({ uId }) {
  return makeRequest(`Spell/character/${uId}`, {
    method: "GET",
    withCredentials: true,
  });
}

export function getItemsForCharacter({ uId }) {
  return makeRequest(`Item/character/${uId}`, {
    method: "GET",
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

export function createProfession({
  uId,
  isPublic,
  language,
  name,
  description,
  talent,
  hiddenTalent,
  keyAttribute,
  weaponMod,
  armorMod,
  gadgetMod,
  companionMod,
  psycheMod,
  spellId,
  itemId,
}) {
  return makeRequest(`Profession`, {
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
      weaponMod: weaponMod,
      armorMod: armorMod,
      gadgetMod: gadgetMod,
      companionMod: companionMod,
      psycheMod: psycheMod,
      spells: spellId === 0 ? null : spellId,
      items: itemId === 0 ? null : itemId,
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
  keyAttribute,
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
      keyAttribute: keyAttribute,
      minValue: minValue,
      manaCost: manaCost,
      effects: effects,
    },
  });
}


export function getRandomMotivation() {
  return makeRequest(`Character/character/motivation`, {
    method: "GET",
    withCredentials: false,
  });
}

export function getRandomCharacteristics() {
  return makeRequest(`Character/character/characteristics`, {
    method: "GET",
    withCredentials: false,
  });
}

export function getRandomAttributes() {
  return makeRequest(`Character/character/attributes`, {
    method: "GET",
    withCredentials: false,
  });
}

export function createCharacter({
  uId,
  isPublic,
  language,
  name,
  description,
  gold,
  jsonReq,
  raceId,
  professionId,
  type
}) {
  return makeRequest(`Character`, {
    method: "POST",
    withCredentials: true,
    data: {
      uId: uId,
      isPublic: isPublic,
      language: language,
      name: name,
      description: description,
      gold: gold,
      jsonRequest: jsonReq,
      race: raceId === 0 ? null : raceId,
      profession: professionId === 0 ? null : professionId,
      type: type
    },
  });
}
