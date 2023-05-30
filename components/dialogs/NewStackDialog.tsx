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
        className={cn(" h-fit w-fit", font.className)}
      >
        <div className="">
          <NewStackForm modalCloseRef={modalCloseRef}/>
        </div>
      </DialogContent>
    </Dialog>
  )
}
