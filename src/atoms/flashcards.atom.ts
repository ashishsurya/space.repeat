import { FlashCard } from "@/lib/types";
import { atom } from "recoil";

export const flashCardsAtom = atom<FlashCard[] | null>({
  default: null,
  key : "flashcards-atom"
})