import Image from "next/image"
import { userAtom } from "@/src/atoms/user.atom"
import { Loader2, Plus } from "lucide-react"
import { useQuery } from "react-query"
import { useRecoilValue } from "recoil"

import { appwrite } from "@/lib/appwrite"
import { cn } from "@/lib/utils"

import { NewStackDialog } from "./dialogs/NewStackDialog"
import { Button } from "./ui/button"

export const StacksContainer = () => {
  const currUser = useRecoilValue(userAtom)
  const { data, error, isLoading } = useQuery("get-stacks", () =>
    appwrite.api.getStacksByUserId(currUser?.$id!)
  )

  if (error) {
    return (
      <pre className="px-8 text-red-500">{JSON.stringify(error, null, 2)}</pre>
    )
  }

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

      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin w-10 h-10" />
        </div>
      )}

      {data?.documents && data.documents.length > 0 ? (
        <div className="flex flex-row flex-wrap items-center mx-4 gap-8">
          {data.documents.map((stack) => (
            <div className="  h-[250px] w-[300px] relative">
              <div className="absolute w-full h-full border translate-x-4 translate-y-4  rounded-lg  "></div>
              <div
                className="z-[5] absolute w-full h-full border translate-x-2 translate-y-2  rounded-lg   bg-primary-foreground"></div>
              <div className="z-[10] absolute p-4 flex items-center justify-center w-full rounded-lg h-full bg-primary-foreground
     border-2">
                <h1 className="capitalize text-3xl font-bold tracking-wide ">{stack.title}</h1>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <NewStackDialog>
            <Image src="/nostacks.svg" width={80} height={80} alt="" />
          </NewStackDialog>
        </div>
      )}
    </div>
  )
}
