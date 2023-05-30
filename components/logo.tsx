import { DM_Mono } from "next/font/google"

import { cn } from "@/lib/utils"

const mono = DM_Mono({ weight: ["500"], subsets: ["latin"] })

export const Logo = () => {
  return <div className={cn(mono.className , "select-none md:text-4xl font-bold")}>space.repeat</div>
}
