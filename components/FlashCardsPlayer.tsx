import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import ReactCardFlip from "react-card-flip"

import type { FlashCard } from "@/lib/types"
import { cn } from "@/lib/utils"

import { Button } from "./ui/button"

export const FlashCardsPlayer = ({
  flashCards,
}: {
  flashCards: FlashCard[]
}) => {
  const [index, setIndex] = useState<number>(0)
  const n = flashCards.length
  useEffect(() => {
    const handleClick = (e: KeyboardEvent) => {
      if (e.code === "KeyJ") {
        setIndex((i) => {
          if (i === 0) {
            return i
          } else {
            return i - 1
          }
        })
      } else if (e.code === "KeyL") {
        setIndex((i) => {
          if (i === n - 1) {
            return i
          } else {
            return i + 1
          }
        })
      }
    }
    window.addEventListener("keydown", handleClick)

    return () => {
      window.removeEventListener("keydown", handleClick)
    }
  }, [n])

  const card = useMemo(() => flashCards[index], [flashCards, index])
  return (
    <div className="flex items-center  flex-1 relative">
      <div className="absolute top-2 w-full justify-center  flex items-center gap-5">
        <div className="flex w-fit flex-col gap-2 items-center">
          <kbd className="">J</kbd>
          <p className="text-xs">Previous Card</p>
        </div>
        <div className="flex w-fit flex-col gap-2 items-center">
          <kbd className="">K</kbd>
          <p className="text-xs">Flip the Card</p>
        </div>
        <div className="flex w-fit flex-col gap-2 items-center">
          <kbd className="">L</kbd>
          <p className="text-xs">Next Card</p>
        </div>
      </div>
      <Button className="shadow-xl" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
        <ArrowLeft className="" />
      </Button>
      <div className="flex-1 flex flex-col items-center gap-6 ">
        <FlippableCard card={card} />
      </div>
      <Button onClick={() => setIndex((i) => i + 1)} className="shadow-xl" disabled={index === n - 1}>
        <ArrowRight className="" />
      </Button>
    </div>
  )
}

const FlippableCard = ({ card }: { card: FlashCard }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const renders = useRef<number>(0)
  useEffect(() => {
    const flipHandle = (e: KeyboardEvent) => {
      if (e.code === "KeyK") {
        setIsFlipped((x) => !x)
      }
    }

    window.addEventListener("keydown", flipHandle)

    return () => {
      window.removeEventListener("keydown", flipHandle)
    }
  }, [])

  useEffect(() => {
    setIsFlipped(false)
  }, [card])

  console.log(renders.current++)

  return (
    <ReactCardFlip
      infinite
      isFlipped={isFlipped}
      containerClassName={" w-[400px] aspect-video  whitespace-pre mx-auto"}
    >
      <FlippableCardContent text={card.front} type="Prompt" />
      <FlippableCardContent text={card.back} type="Answer" />
    </ReactCardFlip>
  )
}

const FlippableCardContent = ({
  text,
  type,
}: {
  text: string
  type: "Prompt" | "Answer"
}) => {
  return (
    <div
      className={cn(
        " h-full  bg-primary text-background text-3xl  place-items-center shadow-xl relative grid rounded-xl"
      )}
    >
      <div className="absolute top-2 text-sm left-2 bg-background text-primary px-2 rounded-md">
        {type}
      </div>
      {text}
    </div>
  )
}
