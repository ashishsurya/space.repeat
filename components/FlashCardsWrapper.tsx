import { flashCardsAtom } from "@/src/atoms/flashcards.atom"
import { useRecoilState } from "recoil"


import { FlashCardsPlayer } from "./FlashCardsPlayer"

export const FlashCardsWrapper = ({}: {}) => {
  const [flashCards, _] = useRecoilState(flashCardsAtom);

  

  if (flashCards && flashCards.length > 0) {
    return <FlashCardsPlayer flashCards={flashCards} />
  }

  return <p>No flashcards......, create some.</p>
}
