import {
  Account,
  Client,
  Databases,
  ID,
  Models,
  Permission,
  Query,
  Role,
} from "appwrite"

import {  Stack,FlashCard } from "./types"

const serverConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  stacksCollectionId: process.env.NEXT_PUBLIC_APPWRITE_STACKS_COLLECTION_ID!,
  flashCardsCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_FLASHCARDS_COLLECTIONID!,
}

const client = new Client()

const account = new Account(client)
const database = new Databases(client)

client.setEndpoint(serverConfig.endpoint).setProject(serverConfig.project)

const api = {
  getStacksByUserId: async ({ id }: { id: string }) => {
    return database.listDocuments<Stack>(
      serverConfig.databaseId,
      serverConfig.stacksCollectionId,
      [Query.equal("user", id), Query.orderDesc("$createdAt")]
    )
  },

  createNewStack: async ({
    title,
    currUserId,
  }: {
    title: string
    currUserId: string
  }) => {
    return database.createDocument<Stack>(
      serverConfig.databaseId,
      serverConfig.stacksCollectionId,
      ID.unique(),
      { title, user: currUserId },
      [
        Permission.read(Role.user(currUserId)),
        Permission.write(Role.user(currUserId)),
      ]
    )
  },

  deleteStack: async ({ id }: { id: string }) => {
    return database.deleteDocument(
      serverConfig.databaseId,
      serverConfig.stacksCollectionId,
      id
    )
  },

  getAllFlashCardsByStackId: async ({ stack_id }: { stack_id: string }) => {
    return database.listDocuments<FlashCard>(
      serverConfig.databaseId,
      serverConfig.flashCardsCollectionId,
      [Query.equal("stack_id", stack_id), Query.orderDesc("$createdAt")]
    )
  },

  addNewFlashCard: async (_opts: {
    front: string
    back: string
    stack_id: string
    front_img_url?: string
    back_img_url?: string
  }) => {
    return database.createDocument<FlashCard>(
      serverConfig.databaseId,
      serverConfig.flashCardsCollectionId,
      ID.unique(),
      { ..._opts }
    )
  },
}

export const appwrite = { account, database, api }
