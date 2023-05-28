import { Account, Client, Databases, ID, Permission, Query, Role } from "appwrite"

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
  getStacksByUserId: async (id: string) => {
    return database.listDocuments(
      serverConfig.databaseId,
      serverConfig.stacksCollectionId,
      [
        Query.orderDesc("$createdAt"),
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
    return database.createDocument(
      serverConfig.databaseId,
      serverConfig.stacksCollectionId,
      ID.unique(),
      { title },
      [
        Permission.read(Role.user(currUserId)),
        Permission.write(Role.user(currUserId)),
      ]
    )
  },
}

export const appwrite = { account, database, api }
