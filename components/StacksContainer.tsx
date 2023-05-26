import Image from "next/image"
import { Loader2, Plus } from "lucide-react"
import useSwr from "swr"

import { appwrite } from "@/lib/appwrite"

import { NewStackDialog } from "./dialogs/NewStackDialog"
import { Button } from "./ui/button"

export const StacksContainer = () => {
  const { data, error, isLoading, isValidating } = useSwr("getStacks", () =>
    appwrite.api.getStacksByUserId("12")
  )

  if (error) {
    return (
      <pre className="px-8 text-red-500">{JSON.stringify(error, null, 2)}</pre>
    )
  }

  console.log(data)

  return (
    <div className="flex flex-1 flex-col gap-5 px-8 ">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium tracking-tight sm:text-2xl lg:text-4xl">
          Welcome, see all your stacks
        </p>
        <NewStackDialog>
          <Button size={"sm"} className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            <p>Add new stack</p>
          </Button>
        </NewStackDialog>
      </div>
      <div className="flex flex-1 items-center justify-center">
        {isLoading || isValidating ? (
          <>
            <div className="">
              <Loader2 className="h-10 w-10 animate-spin" />
            </div>
          </>
        ) : (
          <>
            {data?.documents && data.total > 0 ? (
              <>
                <div>{/* return all stacks here */}</div>
              </>
            ) : (
              <>
                <div className="">
                  <Image
                    className="cursor-pointer"
                    src="/nostacks.svg"
                    alt="no-stacks-svg"
                    width={400}
                    height={500}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
