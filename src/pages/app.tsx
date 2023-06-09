import Head from "next/head"

import { Header } from "@/components/Header"
import { StacksContainer } from "@/components/StacksContainer"

import { UserProvider } from "../providers/user-provider"

export default function App() {
  return (
    <>
      <Head>
        <title>app &middot; space.repeat</title>
      </Head>
      <UserProvider>
        <div className="flex min-h-screen flex-col gap-5">
          <Header />
          <StacksContainer />
        </div>
      </UserProvider>
    </>
  )
}
