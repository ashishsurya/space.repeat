import { Account, Client, Databases } from "appwrite"

const client = new Client()

const account = new Account(client)
const database = new Databases(client)

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

export const appwrite = { account, database }
