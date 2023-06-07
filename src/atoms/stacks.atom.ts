import { atom } from "recoil"

import { Stack } from "@/lib/types"

export const stacksAtom = atom<Stack[] | null>({
  default: [],
  key: "stacks-atom",
})
