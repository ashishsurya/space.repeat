import React, { useCallback } from "react"

import { appwrite } from "@/lib/appwrite"
import { getHost } from "@/lib/utils"

import { Button } from "./ui/button"

export const SocialLoginButton = ({
  provider,
  children,
}: React.PropsWithChildren<{ provider: "google" | "facebook" | "github" }>) => {
  const handleSocialLogin = useCallback(() => {
    try {
      appwrite.account.createOAuth2Session(
        provider,
        `${getHost()}/app`,
        `${getHost()}/login`
      )
    } catch (error) {
      console.log(error)
    }
  }, [provider])

  return (
    <Button onClick={handleSocialLogin} className="disabled:cursor-not-allowed">
      {children}
    </Button>
  )
}
