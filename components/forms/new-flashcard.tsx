import { RefObject } from "react"
import { flashCardsAtom } from "@/src/atoms/flashcards.atom"
import { newFlashDialogAtom } from "@/src/atoms/newFlashDialog.atom"
import { currentStackAtom } from "@/src/atoms/stack.atom"
import { stacksAtom } from "@/src/atoms/stacks.atom"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import ReactTextareaAutosize from "react-textarea-autosize"
import { useRecoilState, useSetRecoilState } from "recoil"
import { z } from "zod"

import { appwrite } from "@/lib/appwrite"

import { Button } from "../ui/button"

const newFlashCardFormSchema = z.object({
  front: z
    .string()
    .min(1, "Prompt of the flashcard cannot be empty")
    .max(100, "Prompt of the flashcard cannot be more than 100 characters"),
  back: z
    .string()
    .min(1, "Answer of the flashcard cannot be empty")
    .max(100, "Answer of the flashcard cannot be more than 100 characters"),
})

export const NewFlashCardForm = () => {
  const setFlashCards = useSetRecoilState(flashCardsAtom)
  const [stack] = useRecoilState(currentStackAtom)
  const [_, setNewFlashcardDialog] = useRecoilState(newFlashDialogAtom)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof newFlashCardFormSchema>>({
    resolver: zodResolver(newFlashCardFormSchema),
    defaultValues: {
      back: "",
      front: "",
    },
  })

  const { mutate, isLoading } = useMutation(appwrite.api.addNewFlashCard, {
    onSuccess(data) {
      setFlashCards((oldFlashCards) => {
        if (!oldFlashCards) {
          return [data]
        } else {
          return [data, ...oldFlashCards]
        }
      })

      setNewFlashcardDialog({ isOpen: false })
    },
  })

  const handleNewFlashCard = (
    values: z.infer<typeof newFlashCardFormSchema>
  ) => {
    mutate({ ...values, stack_id: stack?.$id! })
  }

  return (
    <form
      onSubmit={handleSubmit(handleNewFlashCard)}
      className={"flex flex-col gap-5 p-4 "}
    >
      <h1></h1>
      <ReactTextareaAutosize
        maxRows={5}
        {...register("front")}
        className="w-full resize-none border-b border-primary bg-transparent   py-4 pb-2 text-2xl placeholder:p-0 focus:border-b-2 focus:outline-none   "
        placeholder="Enter prompt , ex. What is the capital of France?"
      />
      <ReactTextareaAutosize
        maxRows={5}
        {...register("back")}
        placeholder={"Enter answer, ex. Paris"}
        className="w-full resize-none border-b border-primary bg-transparent   py-4 pb-2 text-2xl placeholder:p-0 focus:border-b-2 focus:outline-none "
      />
      <Button className="self-start" disabled={isLoading}>
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create"}
      </Button>
    </form>
  )
}
