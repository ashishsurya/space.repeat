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
    <div className="w-[350px] border px-2 pt-5">
      <h2 className="text-3xl text-primary tracking-tighter font-bold">{stack.title}</h2>
      <p className="text-sm text-accent font-semibold mt-2">{dayjs(stack.$createdAt).fromNow()}</p>
      {isLoadingCards ? (
        <div>Loading.....</div>
      ) : (
        <>
          {flashCards && flashCards.length > 0 ? (
            <div className={cn("flex flex-col gap-3 mt-5")}>
              {flashCards.map((x, i) => (
                <li
                  className="list-none text-lg line-clamp-1 cursor-pointer hover:bg-accent px-2 py-4 duration-500 focus:bg-accent rounded-lg"
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
