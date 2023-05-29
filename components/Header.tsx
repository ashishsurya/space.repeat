import { useCallback } from "react"
import { userAtom } from "@/src/atoms/user.atom"
import { useRecoilValue } from "recoil"

import { LogoutButton } from "./LogoutButton"
import { Logo } from "./logo"
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
    <div className="flex p-8 justify-between  border-b items-center">
      <Logo />
      <div className="flex  items-center justify-end gap-5">
        <ThemeToggle />
        <Avatar>
          <AvatarFallback>{getFallbackName(user)}</AvatarFallback>
        </Avatar>
        <LogoutButton />
      </div>
    </div>
  )
}
