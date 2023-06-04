import React from "react"
import { font } from "@/src/pages/_app"
import { Models } from "appwrite"
import { useMutation, useQueryClient } from "react-query"

import { appwrite } from "@/lib/appwrite"
import { cn, displayDateTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { NewStackForm } from "@/components/forms/new-stack"
import { Stack } from "@/lib/types"

export const StackViewDialog = ({
  children,
  stack,
}: React.PropsWithChildren<{ stack: Stack }>) => {
  const client = useQueryClient()
  const { mutate, isLoading } = useMutation(appwrite.api.deleteStack, {
    onSuccess() {
      client.invalidateQueries("get-stacks")
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn("w-full h-full  md:h-3/5 md:w-3/5", font.className)}
      >
        <div className="flex flex-col mt-10">
          <div
            className={cn("flex items-center justify-between border-b pb-2")}
          >
            <h3 className={cn("text-4xl font-bold select-none")}>
              {stack.title}
            </h3>
            <p className={cn("text-sm text-muted-foreground")}>
              {displayDateTime(stack.$createdAt)} ago
            </p>
          </div>

          <div className={"flex-1"}></div>

          <div>
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
