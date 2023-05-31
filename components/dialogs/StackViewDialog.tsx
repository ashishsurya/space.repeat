import React from "react";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {font} from "@/src/pages/_app";
import {NewStackForm} from "@/components/forms/new-stack";

export const StackViewDialog = ({ children }: React.PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn("w-full h-full  md:h-3/5 md:w-3/5", font.className)}
      >
        <div className="">

        </div>
      </DialogContent>
    </Dialog>
  )
}
