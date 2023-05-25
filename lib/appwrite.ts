import { Account, Client, Databases, } from "appwrite"

const client = new Client();

const account = new Account(client)
const database = new Databases(client)

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('646b956968c5ff64a34f');
  

export const appwrite = { account,database }
