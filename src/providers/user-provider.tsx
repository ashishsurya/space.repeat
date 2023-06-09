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
      } finally {
        setLoading(false)
      }
    })()
  }, [router, setUser])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Player
          src={"https://assets1.lottiefiles.com/packages/lf20_poqmycwy.json"}
        />
      </div>
    )
  }

  return <>{children}</>
}
