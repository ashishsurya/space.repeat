import { atom } from "recoil"

export const newFlashDialogAtom = atom<{ isOpen: boolean }>({
  key: "new-flashcard-dialog-open",
  default: { isOpen: false },
})
