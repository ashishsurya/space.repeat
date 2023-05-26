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
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
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
