export function getMotivation(json) {
  return (
    `You have to ${json.objective ?? "rescue"} ` +
    `your ${json.subject ?? "companion"} ` +
    `who was ${json.what_Happened ?? "kidnapped"} ` +
    `in the ${json.where_Happened ?? "ancient forest"} ` +
    `by ${json.how_Happened ?? "dark elves"}, ` +
    `now roaming in the ${json.destination ?? "Beastmen city"}.`
  );
}

export function getCharacteristics(json) {
  return (
    `Your  voice is ${json.voice ?? "loud"} ` +
    `and your posture is ${json.posture ?? "athletic"}. ` +
    `You are considered to be ${json.temperament ?? "brave"}. ` +
    `You believe in the ${json.beliefs ?? "Sister Water"}. ` +
    `Your face covered in ${json.face ?? "mystic markings"} ` +
    `indicates your origins - the ${json.origins ?? "Beastmen city"}.`
  );
}