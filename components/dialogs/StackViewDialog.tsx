import React, { Fragment, useEffect, useRef } from "react"
import { flashCardsAtom } from "@/src/atoms/flashcards.atom"
import { currentStackAtom } from "@/src/atoms/stack.atom"
import { stacksAtom } from "@/src/atoms/stacks.atom"
import { font } from "@/src/pages/_app"
import { Dialog, Transition } from "@headlessui/react"
import { toast } from "react-hot-toast"
import { useMutation, useQuery } from "react-query"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

import { appwrite } from "@/lib/appwrite"
import { Stack } from "@/lib/types"
import { cn } from "@/lib/utils"

import { FlashCardsWrapper } from "../FlashCardsWrapper"
import { StackViewDialogSidebar } from "../StackViewDialogSidebar"

export const StackViewDialog = ({
  children,
  stack,
}: React.PropsWithChildren<{ stack: Stack }>): React.JSX.Element => {
  const setStacks = useSetRecoilState(stacksAtom)
  const [currentStack, setCurrentStack] = useRecoilState(currentStackAtom)
  const [flashCards, setFlashCards] = useRecoilState(flashCardsAtom)

  // to close modal after deleting the stack
  const deleteStackCloseRef = useRef<HTMLButtonElement>(null)

  const { isFetching: isLoadingCards } = useQuery(
    "flashcards-by-stack_id",
    () => appwrite.api.getAllFlashCardsByStackId({ stack_id: stack.$id }),
    {
      onSuccess(data) {
        setFlashCards(data.documents)
      },

      onError() {
        toast.error("Not able to load thr flashcards right now.")
      },
      refetchOnWindowFocus: false,
    }
  )

  const { mutate, isLoading } = useMutation(appwrite.api.deleteStack, {
    onSuccess() {
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

  // clears the flashcards state when stack-view-dialog closes
  useEffect(() => {
    return () => {
      setFlashCards(null)
    }
  }, [])

  return (
    <Transition appear show={currentStack !== null} as={Fragment}>
      <Dialog
        as="div"
        className={cn("relative z-10", font.className)}
        onClose={() => setCurrentStack(null)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 h-screen w-screen bg-background">
          <div className=" flex h-full w-full gap-5 p-4">
            <StackViewDialogSidebar
              stack={stack}
              isLoadingCards={isLoadingCards}
            />
            <FlashCardsWrapper />
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
