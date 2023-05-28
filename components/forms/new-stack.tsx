import { userAtom } from "@/src/atoms/user.atom"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ArrowDownLeftIcon,
  ArrowDownRightIcon,
  CornerDownLeft,
  Loader2,
} from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { useMutation } from "react-query"
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

export const NewStackForm = () => {
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
      onSuccess(data, variables, context) {},
    }
  )

  const handleNewStack = (values: z.infer<typeof newStackFormSchema>) => {
    mutate({ currUserId: currUser?.$id!, title: values.title })
  }

  return (
    <Form {...stackForm}>
      <form
        onSubmit={stackForm.handleSubmit(handleNewStack)}
        className="space-y-4"
      >
        <FormField
          control={stackForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Stack title"
                  className=" w-fit border-primary bg-transparent pb-2 text-4xl  focus:border-b p-4 focus:outline-none placeholder:p-0"
                  fullyCustomize={true}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-3">
          <Button disabled={isCreatingNewStack}>
            <div>
              {isCreatingNewStack ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Submit"
              )}
            </div>
          </Button>
          <p className="text-xs text-muted-foreground flex items-center">
            Click Enter{" "}
            <span>
              <CornerDownLeft className="w-3 h-3" />
            </span>
          </p>
        </div>
      </form>
    </Form>
  )
}
