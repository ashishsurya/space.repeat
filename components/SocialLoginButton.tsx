import React, { useCallback } from "react"
import { userAtom } from "@/src/atoms/user.atom"
import { useRecoilState } from "recoil"

import { appwrite } from "@/lib/appwrite"

import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"

export const SocialLoginButton = ({
  provider,
  children,
}: React.PropsWithChildren<{ provider: "google" | "facebook" | "github" }>) => {
  const [user, setUser] = useRecoilState(userAtom)
  const { toast } = useToast()

  const handleSocialLogin = useCallback(() => {
    try {
      appwrite.account.createOAuth2Session(
        provider,
        "http://localhost:3000/app",
        "http://localhost:3000/login"
      )
    } catch (error) {
      toast({ title: "Error signing you in " })
    }
  }, [provider, toast])

  return (
    <Button
      disabled={provider === "facebook"}
      onClick={handleSocialLogin}
      className="disabled:cursor-not-allowed"
    >
      {children}
    </Button>
  )
}
