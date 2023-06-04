import Image from "next/image"
import { userAtom } from "@/src/atoms/user.atom"
import { Loader2, Plus } from "lucide-react"
import { useQuery } from "react-query"
import { useRecoilValue } from "recoil"

import { appwrite } from "@/lib/appwrite"
import { HomePageStackPreview } from "@/components/HomePageStackPreview"
import { StackViewDialog } from "@/components/dialogs/StackViewDialog"

import { NewStackDialog } from "./dialogs/NewStackDialog"
import { Button } from "./ui/button"

export const StacksContainer = () => {
  const currUser = useRecoilValue(userAtom)
  const { data, error, isLoading } = useQuery("get-stacks", () =>
    appwrite.api.getStacksByUserId({ id: currUser?.$id! })
  )

  if (error) {
    return (
      <pre className="px-8 text-red-500">{JSON.stringify(error, null, 2)}</pre>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-10 px-8">
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
        <div className="flex items-center justify-center flex-1">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      )}

      {data?.documents && data.documents.length > 0 ? (
        <div className=" flex flex-row flex-wrap items-center gap-8 lg:mx-20 ">
          {data.documents.map((stack) => (
            <HomePageStackPreview stack={stack} key={stack.$id} />
          ))}
        </div>
      ) : (
        <>
          {!isLoading && (
            <div className="flex items-center justify-center border flex-1">
              <NewStackDialog>
                <Image src="/nostacks.svg" width={400} height={0} alt="" />
              </NewStackDialog>
            </div>
          )}
        </>
      )}
    </div>
  )
}
