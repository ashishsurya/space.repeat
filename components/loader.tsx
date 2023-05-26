import { Loader2 } from "lucide-react"

export const AppLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen border">
      <Loader2 className="animate-spin h-20 w-20" />
      <p>Please wait authenticating</p>
    </div>
  )
}
