import React, { useRef } from "react"
import { flashCardsAtom } from "@/src/atoms/flashcards.atom"
import { stacksAtom } from "@/src/atoms/stacks.atom"
import { font } from "@/src/pages/_app"
import { useMutation, useQuery } from "react-query"
import { useRecoilState, useSetRecoilState } from "recoil"

import { appwrite } from "@/lib/appwrite"
import { Stack } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { StackViewDialogSidebar } from "../StackViewDialogSidebar"

export const StackViewDialog = ({
  children,
  stack,
}: React.PropsWithChildren<{ stack: Stack }>): React.JSX.Element => {
  const setStacks = useSetRecoilState(stacksAtom)

  // to close modal after deleting the stack
  const deleteStackCloseRef = useRef<HTMLButtonElement>(null)

  

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

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        closeRef={deleteStackCloseRef}
        className={cn("h-screen w-screen ", font.className)}
      >
        <div className=" flex">
          <StackViewDialogSidebar stack={stack}/>
          <div className="flex-1"></div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
