import { userAtom } from "@/src/atoms/user.atom"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ArrowDownLeftIcon,
  ArrowDownRightIcon,
  CornerDownLeft,
  Loader2,
} from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import { useRecoilState, useRecoilValue } from "recoil"
import { boolean, z } from "zod"

import { appwrite } from "@/lib/appwrite"

import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

const newStackFormSchema = z.object({
  title: z
    .string()
    .min(1, "Stack title cannot be empty")
    .max(50, "Stack title cannot be more than 50 characters"),
})

export const NewStackForm = ({ modalCloseRef }: { modalCloseRef: any }) => {
  const queryClient = useQueryClient()
  const currUser = useRecoilValue(userAtom)

  const stackForm = useForm<z.infer<typeof newStackFormSchema>>({
    resolver: zodResolver(newStackFormSchema),
    defaultValues: {
      title: "",
    },
  })

  const { mutate, isLoading: isCreatingNewStack } = useMutation(
    appwrite.api.createNewStack,
    {
      onSuccess() {
        void queryClient.invalidateQueries("get-stacks")
        modalCloseRef.current.click()
      },
    }
  )

  const handleNewStack = (values: z.infer<typeof newStackFormSchema>) => {
    mutate({ currUserId: currUser?.$id!, title: values.title })
  }

  return (
    <Form {...stackForm}>
      <form
        onSubmit={stackForm.handleSubmit(handleNewStack)}
        className="space-y-4 flex flex-col items-start mt-5"
      >
        <Input
          {...stackForm.register("title")}
          placeholder="Stack title"
          className=" w-fit border-primary bg-transparent pb-2 text-4xl  focus:border-b focus:outline-none placeholder:p-0"
          fullyCustomize={true}
        />
        <Button disabled={isCreatingNewStack}>
          {isCreatingNewStack ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  )
}
