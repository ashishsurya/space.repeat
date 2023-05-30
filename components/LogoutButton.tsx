import { useRouter } from "next/router"

import { appwrite } from "@/lib/appwrite"

import { Button } from "./ui/button"

export const LogoutButton = () => {
  const router = useRouter()
  return (
    <Button
      size={"sm"}
      variant={"destructive"}
      onClick={async () => {
        await appwrite.account.deleteSession("current");
        router.push("/login")
      }}
    >
      Logout
    </Button>
  )
}
