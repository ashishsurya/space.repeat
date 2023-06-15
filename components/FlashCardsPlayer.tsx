import React, { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react"
import ReactCardFlip from "react-card-flip"

import type { FlashCard } from "@/lib/types"
import { cn } from "@/lib/utils"

import { Button } from "./ui/button"

// eslint-disable-next-line react/display-name
export const FlashCardsPlayer = React.forwardRef<
  HTMLDivElement,
  { flashCards: FlashCard[] }
>(({ flashCards }, ref) => {
  const [index, setIndex] = useState<number>(0)
  const n = useMemo(() => flashCards.length, [flashCards])
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

  useEffect(() => {
    setIndex((i) => i)
  }, [flashCards])

  const card = useMemo(() => flashCards[index], [flashCards, index])
  return (
    <div ref={ref} className="flex items-center  flex-1 relative p-4">
      <KeyboardShortcuts />
      <Button
        className="shadow-xl"
        disabled={index === 0}
        onClick={() => setIndex((i) => i - 1)}
      >
        <ArrowLeft className="" />
      </Button>
      <div className="flex-1 flex flex-col items-center gap-6 ">
        <FlippableCard card={card} />
      </div>
      <Button
        onClick={() => setIndex((i) => i + 1)}
        className="shadow-xl"
        disabled={index === n - 1}
      >
        <ArrowRight className="" />
      </Button>
    </div>
  )
})

const KeyboardShortcuts = () => {
  return (
    <div
      id="card-player-shortcuts"
      className="absolute top-2  w-full justify-center  flex items-center gap-5 text-white"
    >
      <div className="flex bg-primary gap-5 p-4 rounded-lg">
        <div className="flex w-fit flex-col gap-2 items-center ">
          <kbd className="">J</kbd>
          <p className="text-xs">
            <ChevronLeft className="w-5 h-5" />
          </p>
        </div>
        <div className="flex w-fit flex-col gap-2 items-center">
          <kbd className="">K</kbd>
          <p className="text-xs">
            <RefreshCw className="w-4 h-5" />
          </p>
        </div>
        <div className="flex w-fit flex-col gap-2 items-center">
          <kbd className="">L</kbd>
          <p className="text-xs">
            <ChevronRight className="w-5 h-5" />
          </p>
        </div>
      </div>
    </div>
  )
}

const FlippableCard = ({ card }: { card: FlashCard }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
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

  return (
      <ReactCardFlip
      infinite
      isFlipped={isFlipped}
      containerClassName={" w-3/5 aspect-video  whitespace-pre mx-auto"}
    >
      <FlippableCardContent text={card.front} type="Question" />
      <FlippableCardContent text={card.back} type="Answer" />
      </ReactCardFlip>

  )
}

const FlippableCardContent = ({
  text,
  type,
}: {
  text: string
  type: "Question" | "Answer"
}) => {
  return (
    <div
      className={cn(
        " h-full  bg-primary text-background text-3xl  place-items-center shadow-xl relative grid rounded-xl p-4 whitespace-pre-line"
      )}
    >
      <div className="absolute top-2 text-sm left-2 bg-background text-primary px-2 rounded-md">
        {type}
      </div>
      {text}
    </div>
  )
}
