import { flashCardsAtom } from "@/src/atoms/flashcards.atom"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Delete, Edit2 } from "lucide-react"
import { UseMutateFunction, useMutation } from "react-query"
import { useRecoilState } from "recoil"

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

  const { mutate } = useMutation(appwrite.api.deleteFlashCard, {
    onSuccess: (_, { id }) => {
      setFlashCards((prev) => {
        return prev?.filter((p) => p.$id !== id) || prev
      })
    },
  })

  return (
    <div className="min-w-fit w-[350px] rounded-2xl border bg-accent px-2 pt-5 text-background">
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
            <div className={cn("mt-5 flex flex-col gap-3")}>
              {flashCards.map((x) => (
                <SidebarFlashCard x={x} key={x.$id} deleteFlashCard={mutate} />
              ))}
            </div>
          ) : (
            <>
              <p>No flashcards</p>
            </>
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
      className="line-clamp-1 cursor-pointer list-none rounded-lg  px-2 py-4 text-lg  font-bold hover:bg-primary  duration-500 group"
      tabIndex={0}
    >
      <p className="flex-1 text-ellipsis line-clamp-1">{x.front}</p>
      <div className="hidden group-hover:inline-flex">
        <Button>
          <Edit2 />
        </Button>
        <Button onClick={() => deleteFlashCard({ id: x.$id })}>
          <Delete />
        </Button>
      </div>
    </div>
  )
}
