import { Fragment } from "react"
import { newFlashDialogAtom } from "@/src/atoms/newFlashDialog.atom"
import { font } from "@/src/pages/_app"
import { Dialog, Transition } from "@headlessui/react"
import { useRecoilState } from "recoil"

import { cn } from "@/lib/utils"

import { NewFlashCardForm } from "../forms/new-flashcard"

export const NewFlashCardDialog = () => {
  const [newFlashDialog, setNewFlashDialog] = useRecoilState(newFlashDialogAtom)

  return (
    <Transition appear show={newFlashDialog.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={cn("relative  z-[20]", font.className)}
        onClose={() => setNewFlashDialog({ isOpen: false })}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed left-[55%] top-1/2 h-fit w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background shadow-xl sm:w-1/2">
          <NewFlashCardForm />
        </div>
      </Dialog>
    </Transition>
  )
}
