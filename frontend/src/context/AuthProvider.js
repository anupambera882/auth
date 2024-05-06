import { atom } from "recoil";

export const auth = atom({
  key: 'token',
  default: {},
});