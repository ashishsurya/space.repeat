import React, { Suspense, useRef } from "react"
import { flashCardsAtom } from "@/src/atoms/flashcards.atom"
import { stacksAtom } from "@/src/atoms/stacks.atom"
import { font } from "@/src/pages/_app"
import { Player } from "@lottiefiles/react-lottie-player"
import { ArrowLeft } from "lucide-react"
import { useMutation, useQuery } from "react-query"
import { useRecoilState, useSetRecoilState } from "recoil"

import { appwrite } from "@/lib/appwrite"
import { Stack } from "@/lib/types"
import { cn, displayDateTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { FlashCardPreview } from "../FlashCardPreview"
import { NewFlashCardDialog } from "./NewFlashCardDialog"

export const StackViewDialog = ({
  children,
  stack,
}: React.PropsWithChildren<{ stack: Stack }>): React.JSX.Element => {
  const setStacks = useSetRecoilState(stacksAtom)

  // to close modal after deleting the stack
  const deleteStackCloseRef = useRef<HTMLButtonElement>(null)

  const { mutate, isLoading } = useMutation(appwrite.api.deleteStack, {
    onSuccess(data) {
      deleteStackCloseRef.current?.click()
      setStacks((oldStacks) => {
        if (!oldStacks) {
          return null
        } else {
          return oldStacks.filter((s) => s.$id !== stack.$id)
        }
      })
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        closeRef={deleteStackCloseRef}
        className={cn("h-full w-full ", font.className)}
      >
        <div className="mt-10 flex flex-col gap-10 overflow-x-auto">
          <div
            className={cn(
              "flex items-center justify-between border-b px-4 pb-2 overflow-auto"
            )}
          >
            <Button
              onClick={() => deleteStackCloseRef.current?.click()}
              variant={"ghost"}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h3
              className={cn(
                "select-none text-xl font-bold  md:text-4xl md:font-semibold"
              )}
            >
              {stack.title}
            </h3>
            <p className={cn("text-sm text-muted-foreground")}>
              {displayDateTime(stack.$createdAt)} ago
            </p>
          </div>

          <Suspense>
            <FlashCardsWrapper stack_id={stack.$id} />
          </Suspense>

          <div className="self-end space-x-5">
            <Button>Add New Flashcard</Button>
            <Button
              variant={"destructive"}
              onClick={() => mutate({ id: stack.$id })}
            >
              Delete Stack
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const FlashCardsWrapper = ({ stack_id }: { stack_id: string }) => {
  const [flashcards, setFlashcards] = useRecoilState(flashCardsAtom)
  const {} = useQuery(
    "get-flashcards-by-stack-id",
    () => appwrite.api.getAllFlashCardsByStackId({ stack_id: stack_id }),
    {
      onSuccess(data) {
        setFlashcards(data.documents)
      },
    }
  )

  return (
    <div className="flex-1 mx-5 px-10 bg-secondary rounded-2xl overflow-scroll">
      {flashcards && flashcards.length > 0 ? (
        <>
          {flashcards.map((flashcard) => (
            <FlashCardPreview
              front={flashcard.front}
              front_img_url={flashcard.back_img_url}
            />
          ))}
        </>
      ) : (
        <NewFlashCardDialog stack_id={stack_id}>
          <div className={cn("flex flex-col items-center  ")}>
            <Player
              autoplay={true}
              loop
              src={
                "https://assets3.lottiefiles.com/packages/lf20_dhtOaoOnRb.json"
              }
              className={"w-full md:w-[500px] aspect-video "}
            />
            <p className="text-muted-foreground text-2xl">
              No flashcards here, Add one by clicking here.
            </p>
          </div>
        </NewFlashCardDialog>
      )}
    </div>
  )
}
