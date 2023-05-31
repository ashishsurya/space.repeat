import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as process from "process";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getHost = () => process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "";
