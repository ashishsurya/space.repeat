import { Fragment } from "react"
import { flashCardsAtom } from "@/src/atoms/flashcards.atom"
import { newFlashDialogAtom } from "@/src/atoms/newFlashDialog.atom"
import { currentStackAtom } from "@/src/atoms/stack.atom"
import { Menu } from "@headlessui/react"
import { Player } from "@lottiefiles/react-lottie-player"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { ArrowLeft, Delete, Edit2, MoreVertical } from "lucide-react"
import { UseMutateFunction, useMutation } from "react-query"
import {
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil"

import { appwrite } from "@/lib/appwrite"
import type { FlashCard, Stack } from "@/lib/types"
import { cn } from "@/lib/utils"

import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"

dayjs.extend(relativeTime)

export const StackViewDialogSidebar = ({
  isLoadingCards,
  handleFocusMode,
}: {
  isLoadingCards: boolean
  handleFocusMode: () => void
}) => {
  const [flashCards, setFlashCards] = useRecoilState(flashCardsAtom)
  const setNewFlashDialog = useSetRecoilState(newFlashDialogAtom)
  const [stack, setStack] = useRecoilState(currentStackAtom) as [
    Stack,
    SetterOrUpdater<Stack | null>
  ]

  // mutation for deleting a stack
  const { mutate: deleteStack } = useMutation(appwrite.api.deleteStack, {
    onSuccess: () => {
      setStack(null)
    },
  })

  // mutation for deleting a flashcard
  const { mutate: deleteFlashCard } = useMutation(
    appwrite.api.deleteFlashCard,
    {
      onSuccess: (_, { id }) => {
        setFlashCards((prev) => {
          return prev?.filter((p) => p.$id !== id) || prev
        })
      },
    }
  )

  return (
    <div className="w-[350px] min-w-fit rounded-2xl border bg-accent  text-background  relative overflow-auto">
      <div className="p-4  bg-primary flex flex-col gap-4  top-0 sticky w-full rounded-t-2xl">
        <StackViewCloseButton onClick={() => setStack(null)} />
        <SidebarStackMetadata
          handleFocusMode={handleFocusMode}
          stack={stack}
          deleteStack={deleteStack}
        />
        <Button
          onClick={() => setNewFlashDialog({ isOpen: true })}
          variant={"default"}
          className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:tracking-wider focus:font-bold focus:border border-background mx-8"
        >
          + Add New FlashCard
        </Button>
      </div>
      {isLoadingCards ? (
        <SidebarLoadingSkeleton />
      ) : (
        <>
          {flashCards && flashCards.length > 0 ? (
            <div className=" flex flex-col mt-2  overflow-auto scroll">
              <SidebarFlashcards
                flashCards={flashCards}
                mutate={deleteFlashCard}
              />
            </div>
          ) : (
            <div className="flex flex-col justify-center   h-fit mt-20">
              <button
                onClick={() => setNewFlashDialog({ isOpen: true })}
                className="flex cursor-pointer flex-col items-center gap-3 rounded-lg    focus:outline-none"
              >
                <Player
                  className="aspect-square w-[300px]"
                  autoplay
                  loop
                  src={
                    "https://assets4.lottiefiles.com/packages/lf20_dhtOaoOnRb.json"
                  }
                />
                <p className="text-sm pb-4">
                  No Flashcards , click here to add one
                </p>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

const StackViewCloseButton = ({ onClick }: { onClick: any }) => (
  <button onClick={onClick} className=" flex gap-2 items-center top-2 left-4">
    <ArrowLeft />
    <p>Back to stacks</p>
    <p className="bg-background text-xs px-2 rounded-lg text-primary text-center">
      esc
    </p>
  </button>
)

const SidebarFlashcards = ({
  flashCards,
  mutate,
}: {
  flashCards: FlashCard[]
  mutate: UseMutateFunction<
    {},
    unknown,
    {
      id: string
    },
    unknown
  >
}) => (
  <div className={cn("mt-5 flex h-full flex-col gap-3 ")}>
    {flashCards.map((x) => (
      <SidebarFlashCard x={x} key={x.$id} deleteFlashCard={mutate} />
    ))}
  </div>
)

const SidebarLoadingSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-14 w-full bg-primary" />
    <Skeleton className="h-14 w-full bg-primary" />
    <Skeleton className="h-14 w-full bg-primary" />
    <Skeleton className="h-14 w-full bg-primary" />
    <Skeleton className="h-14 w-full bg-primary" />
    <Skeleton className="h-14 w-full bg-primary" />
  </div>
)

const SidebarStackMetadata = ({
  stack,
  deleteStack,
  handleFocusMode,
}: {
  stack: Stack
  handleFocusMode: () => void
  deleteStack: UseMutateFunction<
    {},
    unknown,
    {
      id: string
    },
    unknown
  >
}) => (
  <div className="flex group justify-between items-center">
    <div>
      <h2 className="text-4xl  font-bold tracking-tighter">{stack.title}</h2>
      <p className="mt-2 text-sm font-semibold">
        {dayjs(stack.$createdAt).fromNow()}
      </p>
    </div>
    <Menu as={"div"} className="relative">
      <Menu.Button as={Fragment}>
        <Button variant={"ghost"}>
          <MoreVertical />
        </Button>
      </Menu.Button>
      <Menu.Items
        as="div"
        className={
          "absolute bg-background right-5 w-32 z-50 shadow-xl flex flex-col items-end  rounded-lg p-1"
        }
      >
        <Menu.Item as={"div"} className="">
          <Button
            onClick={() => {
              const x = confirm(
                `Are you sure to delete the stack - ${stack.title} `
              )
              if (x) {
                deleteStack({ id: stack.$id })
              } else {
                return
              }
            }}
            variant={"destructive"}
            className="w-"
          >
            Delete
          </Button>
        </Menu.Item>
        <Menu.Item onClick={handleFocusMode} as={"div"} className="">
          <Button variant={"secondary"}>Focus mode</Button>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  </div>
)

const SidebarFlashCard = ({
  x,
  deleteFlashCard,
}: {
  x: FlashCard
  deleteFlashCard: UseMutateFunction<
    {},
    unknown,
    {
      id: string
    },
    unknown
  >
}) => {
  return (
    <div
      key={x.$id}
      className="group line-clamp-1 cursor-pointer list-none   px-2 py-4  font-bold  duration-500  flex items-center "
      tabIndex={0}
    >
      <p className="line-clamp-1 flex-1 text-ellipsis text-sm p-2 py-4 ">
        {x.front.slice(0, 35) + "...."}
      </p>
      <div className="hidden group-hover:inline-flex gap-4 pr-4">
        {/* edit functiionality in future */}
        {/* <Button className="p-2" variant={"ghost"} title="edit the flashcard">
          <Edit2 className="w-5 h-5" />
        </Button> */}
        <Button
          title="delete the flashcard"
          className="p-2"
          variant={"ghost"}
          onClick={() => deleteFlashCard({ id: x.$id })}
        >
          <Delete className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
