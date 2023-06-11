import { Stack } from "@/lib/types";
import { atom } from "recoil";

export const currentStackAtom = atom<Stack | null>({
  default: null,
  key: "current-stack-atom",
})