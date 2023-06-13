import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getHost = () => window.origin;

export const displayDateTime = (date : string) => dayjs(date).fromNow(true)
