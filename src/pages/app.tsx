import Head from "next/head"

import { Header } from "@/components/Header"
import { StacksContainer } from "@/components/StacksContainer"
import { UserProvider } from "../providers/user-provider"

export default function App() {
  return (
    <UserProvider>
      <div className="flex min-h-screen flex-col gap-5">
        <Head>
          <title>app &middot; space.repeat</title>
        </Head>
        <Header />
        <StacksContainer />
      </div>
    </UserProvider>
  )
}
