import React from "react"
import { font } from "@/src/pages/_app"
import { useMutation, useQueryClient } from "react-query"

import { appwrite } from "@/lib/appwrite"
import { Stack } from "@/lib/types"
import { cn, displayDateTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { FlashCardPreview } from "../FlashCardPreview"
import { ScrollArea } from "../ui/scroll-area"
import { useToast } from "../ui/use-toast"

export const StackViewDialog = ({
  children,
  stack,
}: React.PropsWithChildren<{ stack: Stack }>): React.JSX.Element => {
  const { toast } = useToast()
  const client = useQueryClient()
  const { mutate, isLoading } = useMutation(appwrite.api.deleteStack, {
    onSuccess() {
      toast({ title: "Stack deleted successfully" })
      client.invalidateQueries("get-stacks")
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn("h-full w-full ", font.className)}>
        <div className="mt-10 flex flex-col gap-10">
          <div
            className={cn(
              "flex items-center justify-between border-b px-4 pb-2"
            )}
          >
            <h3 className={cn("select-none text-4xl font-bold")}>
              {stack.title}
            </h3>
            <p className={cn("text-sm text-muted-foreground")}>
              {displayDateTime(stack.$createdAt)} ago
            </p>
          </div>

          <div className=" grid flex-1  auto-cols-[80%] grid-flow-col  gap-10 overflow-x-auto sm:auto-cols-[50%] md:auto-cols-[40%]">
            <FlashCardPreview
              front={{ text: "Prompt" }}
              back={{ text: "Answer" }}
            />
          </div>

          <div className="self-end">
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
