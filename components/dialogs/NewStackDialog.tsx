import { cn } from "@/lib/utils"
import { font } from "@/src/pages/_app"
import React from "react"
import { Button } from "../ui/button"



import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"

export const NewStackDialog = ({ children }: React.PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn("h-4/5 w-4/5" , font.className)}>
        <DialogHeader>
          <DialogTitle>Create a new stack</DialogTitle>
          <DialogDescription>
            <p>Choose a name for your new stack, and add all flashcards </p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex">
          <p>Nice choice for creating a new stack</p>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
