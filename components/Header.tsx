import { useCallback } from "react"
import { userAtom } from "@/src/atoms/user.atom"
import { useRecoilValue } from "recoil"

import { LogoutButton } from "./LogoutButton"
import { ThemeToggle } from "./theme-toggle"
import { Avatar, AvatarFallback } from "./ui/avatar"

export const Header = () => {
  const user = useRecoilValue(userAtom)
  const getFallbackName = useCallback(
    (_user: typeof user) =>
      _user?.name
        .split(" ")
        .map((x: string) => x[0])
        .join(""),
    []
  )

  return (
    <div className="flex p-8 items-center justify-end gap-5 border-b">
      <ThemeToggle />
      <Avatar>
        <AvatarFallback>{getFallbackName(user)}</AvatarFallback>
      </Avatar>
      <LogoutButton />
    </div>
  )
}
