import { avatars } from "../enums/avatars";

export function getImage(id) {
  return avatars.find((e) => e.id === (id >= 0 && id < avatars.length ? id : 0));
}