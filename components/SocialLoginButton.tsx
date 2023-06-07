import React, { useCallback } from "react"
import { userAtom } from "@/src/atoms/user.atom"
import { useRecoilState } from "recoil"

import { appwrite } from "@/lib/appwrite"
import { getHost } from "@/lib/utils"

import { Button } from "./ui/button"

export const SocialLoginButton = ({
  provider,
  children,
}: React.PropsWithChildren<{ provider: "google" | "facebook" | "github" }>) => {
  const [user, setUser] = useRecoilState(userAtom)

  const handleSocialLogin = useCallback(() => {
    try {
      appwrite.account.createOAuth2Session(
        provider,
        `${getHost()}/app`,
        `${getHost()}/login`
      )
    } catch (error) {}
  }, [provider])

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
