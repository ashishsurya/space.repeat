import Image from "next/image"
import { userAtom } from "@/src/atoms/user.atom"
import { Loader2, Plus } from "lucide-react"
import { useQuery } from "react-query"
import { useRecoilValue } from "recoil"

import { appwrite } from "@/lib/appwrite"

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

      {data?.documents && data.documents.length > 0 ? <div></div> : <div></div>}
    </div>
  )
}
