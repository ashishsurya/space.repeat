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
  const [loading, setLoading] = useState<boolean>(false)
  const setUser = useSetRecoilState(userAtom)
  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const user = await appwrite.account.get()
        setUser(user)
      } catch (error) {
        void router.replace("/login")
      } finally {
        setLoading(false)
      }
    })()
  }, [router, setLoading, setUser])

  if (loading) {
    return <AppLoader />
  }

  return (
    <div className="flex min-h-screen flex-col gap-5">
      <Head>
        <title>app &middot; space.repeat</title>
      </Head>
      <Header />
      <StacksContainer />
    </div>
  )
}
