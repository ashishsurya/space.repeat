import React, { useRef } from "react"
import { font } from "@/src/pages/_app"

import { cn } from "@/lib/utils"

import { NewStackForm } from "../forms/new-stack"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog"
import { Separator } from "../ui/separator"

export const NewStackDialog = ({ children }: React.PropsWithChildren) => {
  const modalCloseRef = useRef(null)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        closeRef={modalCloseRef}
        className={cn("w-full h-fit top-1/2 -translate-y-1/2 md:h-fit md:w-fit", font.className)}
      >
        <NewStackForm modalCloseRef={modalCloseRef} />
      </DialogContent>
    </Dialog>
  )
}
