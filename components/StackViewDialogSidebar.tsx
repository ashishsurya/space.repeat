import { flashCardsAtom } from "@/src/atoms/flashcards.atom"
import { newFlashDialogAtom } from "@/src/atoms/newFlashDialog.atom"
import { Player } from "@lottiefiles/react-lottie-player"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Delete, Edit2 } from "lucide-react"
import { UseMutateFunction, useMutation } from "react-query"
import { useRecoilState, useSetRecoilState } from "recoil"

import { appwrite } from "@/lib/appwrite"
import type { FlashCard, Stack } from "@/lib/types"
import { cn } from "@/lib/utils"

import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"

dayjs.extend(relativeTime)

export const StackViewDialogSidebar = ({
  isLoadingCards,
  stack,
}: {
  isLoadingCards: boolean
  stack: Stack
}) => {
  const [flashCards, setFlashCards] = useRecoilState(flashCardsAtom)
  const setNewFlashDialog = useSetRecoilState(newFlashDialogAtom)

  const { mutate } = useMutation(appwrite.api.deleteFlashCard, {
    onSuccess: (_, { id }) => {
      setFlashCards((prev) => {
        return prev?.filter((p) => p.$id !== id) || prev
      })
    },
  })

  return (
    <div className="w-[350px] min-w-fit rounded-2xl border bg-accent px-2 pt-5 text-background overflow-auto relative">
      <h2 className="text-4xl  font-bold tracking-tighter">{stack.title}</h2>
      <p className="mt-2 text-sm font-semibold">
        {dayjs(stack.$createdAt).fromNow()}
      </p>
      {isLoadingCards ? (
        <div className="space-y-4">
          <Skeleton className="h-14 w-full bg-primary" />
          <Skeleton className="h-14 w-full bg-primary" />
          <Skeleton className="h-14 w-full bg-primary" />
          <Skeleton className="h-14 w-full bg-primary" />
          <Skeleton className="h-14 w-full bg-primary" />
          <Skeleton className="h-14 w-full bg-primary" />
        </div>
      ) : (
        <>
          {flashCards && flashCards.length > 0 ? (
            <div className="overflow-auto flex flex-col mt-3">
              <Button
                onClick={() => setNewFlashDialog({ isOpen: true })}
                variant={"outline"}
              >
                + Add New FlashCard
              </Button>
              <div className="overflow-scroll">
                <div className={cn("mt-5 flex h-full flex-col gap-3 ")}>
                  {flashCards.map((x) => (
                    <SidebarFlashCard
                      x={x}
                      key={x.$id}
                      deleteFlashCard={mutate}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center   h-fit mt-20">
              <button
                onClick={() => setNewFlashDialog({ isOpen: true })}
                className="flex cursor-pointer flex-col items-center gap-3 rounded-lg focus:border focus:border-background focus:outline-none"
              >
                <Player
                  className="aspect-square w-[300px]"
                  autoplay
                  loop
                  src={
                    "https://assets4.lottiefiles.com/packages/lf20_dhtOaoOnRb.json"
                  }
                />
                <p className="text-sm">No Flashcards , click here to add one</p>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

const SidebarFlashCard = ({
  x,
  deleteFlashCard,
}: {
  x: FlashCard
  deleteFlashCard: UseMutateFunction<
    {},
    unknown,
    {
      id: string
    },
    unknown
  >
}) => {
  return (
    <div
      key={x.$id}
      className="group line-clamp-1 cursor-pointer list-none  rounded-lg px-2 py-4  font-bold  duration-500  flex items-center"
      tabIndex={0}
    >
      <p className="line-clamp-1 flex-1 text-ellipsis text-xl p-2">{x.front}</p>
      <div className="hidden group-hover:inline-flex gap-4 pr-4">
        <Button className="p-2" variant={"ghost"} title="edit the flashcard">
          <Edit2 className="w-5 h-5" />
        </Button>
        <Button
          title="delete the flashcard"
          className="p-2"
          variant={"ghost"}
          onClick={() => deleteFlashCard({ id: x.$id })}
        >
          <Delete className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
