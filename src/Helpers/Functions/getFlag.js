import { flags } from "../enums/flags";

export function getFlag(country) {
  return flags.find((e) => e.title === country);
}