import { motion } from "framer-motion"

import type { FlashCard } from "@/lib/types"

export const FlashCardPreview = ({
  front,
  front_img_url,
}: Pick<FlashCard, "front" | "front_img_url">) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" border-4 rounded-xl m-5 w-[300px] aspect-[3/2] aspect[3/2] inline-flex bg-background items-center justify-center p-4"
    >
      <p className="text-2xl text-ellipsis whitespace-wrap line-clamp-1">{front}</p>
    </motion.div>
  )
}
