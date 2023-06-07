import { RefObject } from "react"
import { flashCardsAtom } from "@/src/atoms/flashcards.atom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import ReactTextareaAutosize from "react-textarea-autosize"
import { useSetRecoilState } from "recoil"
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
export const NewFlashCardForm = ({
  stack_id,
  newFlashCardDialogCloseRef,
}: {
  stack_id: string
  newFlashCardDialogCloseRef: RefObject<HTMLButtonElement>
}) => {
  const setFlashCards = useSetRecoilState(flashCardsAtom)
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
    onSuccess(data, variables, context) {
      setFlashCards((oldFlashCards) => {
        if (!oldFlashCards) {
          return null
        } else {
          return [data, ...oldFlashCards]
        }
      })

      newFlashCardDialogCloseRef.current?.click()
    },
  })

  const handleNewFlashCard = (
    values: z.infer<typeof newFlashCardFormSchema>
  ) => {
    mutate({ ...values, stack_id: stack_id })
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
        className="w-full rounded-xl border border-primary bg-transparent px-8  py-4 pb-2 text-2xl placeholder:p-0 focus:border-2 focus:outline-none   "
        placeholder="Enter prompt , ex. What is the capital of France?"
      />
      <ReactTextareaAutosize
        maxRows={5}
        {...register("back")}
        placeholder={"Enter answer, ex. Paris"}
        className="w-full rounded-xl border border-primary bg-transparent px-8  py-4 pb-2 text-2xl placeholder:p-0 focus:border-2 focus:outline-none "
      />
      <Button className="self-start">Create</Button>
    </form>
  )
}
