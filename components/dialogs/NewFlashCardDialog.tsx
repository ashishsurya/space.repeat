import { font } from "@/src/pages/_app"

import { cn } from "@/lib/utils"

import { NewFlashCardForm } from "../forms/new-flashcard"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { useRef } from "react"

export const NewFlashCardDialog = ({
  stack_id,
  children,
}: React.PropsWithChildren<{ stack_id: string }>) => {
  const newFlashCardDialogCloseRef = useRef<HTMLButtonElement>(null)
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "w-full h-fit top-1/2 -translate-y-1/2 md:h-fit md:w-1/2",
          font.className
        )}
        closeRef={newFlashCardDialogCloseRef}
      >
        <NewFlashCardForm stack_id={stack_id} newFlashCardDialogCloseRef={newFlashCardDialogCloseRef}/>
      </DialogContent>
    </Dialog>
  )
}
