import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Player } from "@lottiefiles/react-lottie-player"
import { Loader2 } from "lucide-react"
import { useSetRecoilState } from "recoil"

import { appwrite } from "@/lib/appwrite"

import { userAtom } from "../atoms/user.atom"

export const UserProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const setUser = useSetRecoilState(userAtom)
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const user = await appwrite.account.get()
        setUser(user)
      } catch (e) {
        router.push("/login")
      } finally {
        setLoading(false)
      }
    })()
  }, [router, setUser])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin w-20 h-20 text-primary" />
      </div>
    )
  }

  return <>{children}</>
}
