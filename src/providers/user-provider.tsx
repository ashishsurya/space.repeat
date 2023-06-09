import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Player } from "@lottiefiles/react-lottie-player"
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
        router.push("/login?error=unauthorized")
      }
      const timer = setTimeout(() => {
        setLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    })()
  }, [router, setUser])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Player
          autoplay
          loop
          className="aspect-video w-52 bg-transparent"
          src={"https://assets4.lottiefiles.com/packages/lf20_RM6elkeGwr.json"}
        />
      </div>
    )
  }

  return <>{children}</>
}
