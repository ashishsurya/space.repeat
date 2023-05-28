import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter();
  return (
    <div className="max-w-3xl mx-auto grid place-items-center min-h-screen">
      <Button onClick={() => router.push("/app")}>Go to App</Button>
    </div>
  )
}
