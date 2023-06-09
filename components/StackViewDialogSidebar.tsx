import { flashCardsAtom } from "@/src/atoms/flashcards.atom"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useQuery } from "react-query"
import { useRecoilState } from "recoil"

import { appwrite } from "@/lib/appwrite"
import type { Stack } from "@/lib/types"
import { cn } from "@/lib/utils"

import { Skeleton } from "./ui/skeleton"

dayjs.extend(relativeTime)

export const StackViewDialogSidebar = ({ stack }: { stack: Stack }) => {
  const [flashCards, setFlashCards] = useRecoilState(flashCardsAtom)

  const { isFetching: isLoadingCards } = useQuery(
    "flashcards-by-stack_id",
    () => appwrite.api.getAllFlashCardsByStackId({ stack_id: stack.$id }),
    {
      onSuccess(data) {
        setFlashCards(data.documents)
      },
    }
  )
  return (
    <div className="w-[350px] border px-2 pt-5 bg-accent text-background rounded-2xl">
      <h2 className="text-4xl  tracking-tighter font-bold">{stack.title}</h2>
      <p className="text-sm font-semibold mt-2">
        {dayjs(stack.$createdAt).fromNow()}
      </p>
      {isLoadingCards ? (
        <div className="space-y-4">
          <Skeleton className="h-14 w-full bg-stone-300" />
          <Skeleton className="h-14 w-full bg-stone-300" />
          <Skeleton className="h-14 w-full bg-stone-300" />
          <Skeleton className="h-14 w-full bg-stone-300" />
          <Skeleton className="h-14 w-full bg-stone-300" />
          <Skeleton className="h-14 w-full bg-stone-300" />
        </div>
      ) : (
        <>
          {flashCards && flashCards.length > 0 ? (
            <div className={cn("flex flex-col gap-3 mt-5")}>
              {flashCards.map((x, i) => (
                <li
                  className="list-none text-lg line-clamp-1 cursor-pointer font-bold px-2 py-4 duration-500  rounded-lg bg-background text-primary"
                  tabIndex={0}
                >
                  {x.front}
                </li>
              ))}
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  )
}
