import { Account, Client, Databases, ID, Permission, Query, Role } from "appwrite"
import { Stack } from "./types"

const serverConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  stacksCollectionId: process.env.NEXT_PUBLIC_APPWRITE_STACKS_COLLECTION_ID!,
}

const client = new Client()

const account = new Account(client)
const database = new Databases(client)

client.setEndpoint(serverConfig.endpoint).setProject(serverConfig.project)

const api = {
  getStacksByUserId: async ({id} : {id:string}) => {
    return database.listDocuments<Stack>(
      serverConfig.databaseId,
      serverConfig.stacksCollectionId,
      [
        Query.equal("user", id),
        Query.orderAsc("$createdAt")
      ]
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
      { title, user : currUserId },
      [
        Permission.read(Role.user(currUserId)),
        Permission.write(Role.user(currUserId)),
      ]
    )
  },

  deleteStack: async ({id} : {id : string}) => { 
    return database.deleteDocument(serverConfig.databaseId, serverConfig.stacksCollectionId, id);
  }
}

export const appwrite = { account, database, api }
