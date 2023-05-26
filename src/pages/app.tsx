import { Suspense, useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useSetRecoilState } from "recoil"

import { appwrite } from "@/lib/appwrite"
import { Header } from "@/components/Header"
import { StacksContainer } from "@/components/StacksContainer"
import { AppLoader } from "@/components/loader"

import { userAtom } from "../atoms/user.atom"

export default function App() {
  const router = useRouter()
  const [loading, setLoadng] = useState<boolean>(false)
  const setUser = useSetRecoilState(userAtom)

  useEffect(() => {
    ;(async () => {
      try {
        setLoadng(true)
        const user = await appwrite.account.get()
        setUser(user)
      } catch (error) {
        router.replace("/login")
      } finally {
        setLoadng(false)
      }
    })()
  }, [router, setLoadng, setUser])

  if (loading) {
    return <AppLoader />
  }

  return (
    <div className="flex min-h-screen flex-col gap-10">
      <Head>
        <title>app &middot; space.repeat</title>
      </Head>
      <Header />
      <StacksContainer />
    </div>
  )
}
