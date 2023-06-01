import React from "react";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {cn, displayDateTime} from "@/lib/utils";
import {font} from "@/src/pages/_app";
import {NewStackForm} from "@/components/forms/new-stack";
import {Models} from "appwrite";
import {Button} from "@/components/ui/button";






export const StackViewDialog = ({children, stack}: React.PropsWithChildren<{ stack: Models.Document }>) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn("w-full h-full  md:h-3/5 md:w-3/5", font.className)}
      >
        <div className="flex flex-col mt-10">

          <div className={cn("flex items-center justify-between border-b pb-2")}>

            <h3 className={cn("text-4xl font-bold select-none")}>{stack.title}</h3>
            <p className={cn("text-sm text-muted-foreground")}>{displayDateTime(stack.$createdAt)} ago</p>
          </div>

          <div className={"flex-1"}></div>

          <div>
            <Button variant={"destructive"}>Delete Stack</Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}
