import { Models } from "appwrite"
import { atom } from "recoil"


export const userAtom = atom<Models.User<Models.Preferences> | null>({
  default: null,
  key: "user-atom",
})
