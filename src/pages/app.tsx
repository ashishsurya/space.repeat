import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Loader2 } from "lucide-react"
import {  useSetRecoilState } from "recoil"

import { appwrite } from "@/lib/appwrite"
import { Header } from "@/components/Header"

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
    return (
      <div className="flex items-center justify-center h-screen border">
        <Loader2 className="animate-spin h-20 w-20" />
      </div>
    )
  }

  return (
    <div className="">
      <Header />
    </div>
  )
}
