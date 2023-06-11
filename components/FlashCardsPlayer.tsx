import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import ReactCardFlip from "react-card-flip"

import type { FlashCard } from "@/lib/types"

import { Button } from "./ui/button"

export const FlashCardsPlayer = ({
  flashCards,
}: {
  flashCards: FlashCard[]
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const [currentCard, setCurrentCard] = useState<FlashCard>(flashCards[0])

  useEffect(() => {
    const handleClick = (e: KeyboardEvent) => {
      console.log(e)

      if (e.code === "Space") {
        setIsFlipped((x) => !x)
      }
    }
    window.addEventListener("keydown", handleClick)

    return () => {
      window.removeEventListener("keydown", handleClick)
    }
  }, [])

  return (
    <div className="flex items-center  flex-1">
      <Button>
        <ArrowLeft className="" />
      </Button>
      <div className="flex-1   self-stretch grid place-items-center">
        <ReactCardFlip
          isFlipped={isFlipped}
          containerClassName={"border whitespace-pre w-[500px] aspect-video"}
        >
          <div className="border bg-primary h-full w-full">
            {currentCard.front}
          </div>
          <div className="border bg-primary h-full w-full">
            {currentCard.back}
          </div>
        </ReactCardFlip>
      </div>
      <Button>
        <ArrowRight className="" />
      </Button>
    </div>
  )
}
