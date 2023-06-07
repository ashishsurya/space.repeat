
import type { FlashCard } from "@/lib/types"


export const FlashCardPreview = ({
  front,
  front_img_url,
}: Pick<FlashCard, "front" | "front_img_url">) => {
  return (
    <div className=" border-4 rounded-xl m-5 w-[200px] aspect-[2/3] aspect[3/2] inline-flex bg-background items-center p-4">
      <div>{front}</div>
    </div>
  )
}
