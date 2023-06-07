import { Models } from "appwrite"

export interface Stack extends Models.Document {
  title: string
  user: string
}

export interface FlashCard extends Models.Document {
  front: string
  back: string
  stack_id: string
  front_img_url?: string
  back_img_url?: string
}
