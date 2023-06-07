import { Suspense } from "react"
import Image from "next/image"
import { stacksAtom } from "@/src/atoms/stacks.atom"
import { userAtom } from "@/src/atoms/user.atom"
import { AnimatePresence } from "framer-motion"
import { Loader2, Plus } from "lucide-react"
import { useQuery } from "react-query"
import { useRecoilState, useRecoilValue } from "recoil"

import { appwrite } from "@/lib/appwrite"
import { HomePageStackPreview } from "@/components/HomePageStackPreview"

import { NewStackDialog } from "./dialogs/NewStackDialog"
import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"

export const StacksContainer = () => {
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

      <Suspense>
        <Stacks />
      </Suspense>
    </div>
  )
}

const Stacks = () => {
  const [stacks, setStacks] = useRecoilState(stacksAtom)
  const currUser = useRecoilValue(userAtom)
  const { error, isLoading } = useQuery(
    "get-stacks",
    () => appwrite.api.getStacksByUserId({ id: currUser?.$id! }),
    {
      onSuccess(data) {
        setStacks(data.documents)
      },
    }
  )

  if (error) {
    return (
      <pre className="px-8 text-red-500">{JSON.stringify(error, null, 2)}</pre>
    )
  }

  if (isLoading) {
    return (
      <div className=" flex flex-row flex-wrap items-center gap-8 lg:mx-20 ">
        {Array(20).map((_, i) => {
          console.log(i)
          return (<Skeleton key={i} className="aspect-[3/2] w-[300px]" />)
        })}
      </div>
    )
  }

  return (
    <>
      {stacks && stacks.length > 0 ? (
        <div className=" flex flex-row flex-wrap items-center gap-8 lg:mx-20 ">
          <AnimatePresence>
            {stacks.map((stack) => (
              <HomePageStackPreview stack={stack} key={stack.$id} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-1">
          <NewStackDialog>
            <Image
              className="cursor-pointer"
              src="/nostacks.svg"
              width={500}
              height={0}
              alt=""
            />
          </NewStackDialog>
        </div>
      )}
    </>
  )
}
