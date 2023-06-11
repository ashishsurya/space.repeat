import Head from "next/head"
import { Transition } from "@headlessui/react"
import { useRecoilState } from "recoil"

import { Header } from "@/components/Header"
import { StacksContainer } from "@/components/StacksContainer"
import { StackViewDialog } from "@/components/dialogs/StackViewDialog"

import { UserProvider } from "../providers/user-provider"
import { currentStackAtom } from "../atoms/stack.atom"

export default function App() {
  const [currentStack] = useRecoilState(currentStackAtom)
  return (
    <>
      <Head>
        <title>app &middot; space.repeat</title>
      </Head>
      <UserProvider>
        <div className="flex min-h-screen flex-col gap-5">
          <Header />
          <StacksContainer />
          {currentStack && <StackViewDialog stack={currentStack}/>}
        </div>
      </UserProvider>
    </>
  )
}
