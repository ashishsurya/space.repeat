import { Account, Client, Databases, Permission, Role } from "appwrite"

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
      serverConfig.stacksCollectionId
    )
  },
}

export const appwrite = { account, database, api }
