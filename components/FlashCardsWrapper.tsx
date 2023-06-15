import { flashCardsAtom } from "@/src/atoms/flashcards.atom"
import React from "react"
import { useRecoilState } from "recoil"

import { FlashCardsPlayer } from "./FlashCardsPlayer"

// eslint-disable-next-line react/display-name
export const FlashCardsWrapper = React.forwardRef<HTMLDivElement>(({} , ref) => {
  const [flashCards, _] = useRecoilState(flashCardsAtom)

  if (flashCards && flashCards.length > 0) {
    return <FlashCardsPlayer ref={ref} flashCards={flashCards} />
  }

  return <p className="flex items-center justify-center flex-1 ">No flashcards......, create some.</p>
})
