import { Models } from "appwrite"
import { motion } from "framer-motion"
import { useRecoilState } from "recoil"

import { Stack } from "@/lib/types"
import { StackViewDialog } from "@/components/dialogs/StackViewDialog"

export const HomePageStackPreview = ({ stack }: { stack: Stack }) => {
  return (
    <StackViewDialog stack={stack}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        tabIndex={0}
        className="group  relative  aspect-[3/2] w-[300px]  cursor-pointer duration-500 hover:scale-110 focus:scale-110  md:w-[250px] "
      >
        <div className="absolute h-full w-full translate-x-4 translate-y-4 rounded-lg border-2 border-accent  "></div>
        <div className="absolute z-[5] h-full w-full translate-x-2 translate-y-2 rounded-lg  border-2 border-accent bg-secondary   "></div>
        <div
          className="absolute z-[10] flex h-full w-full items-center justify-center rounded-lg border-2  border-accent bg-secondary
     p-4"
        >
          <h1 className="text-3xl font-bold capitalize tracking-wide ">
            {stack.title}
          </h1>
        </div>
      </motion.div>
    </StackViewDialog>
  )
}
