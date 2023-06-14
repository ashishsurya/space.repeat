import { useRouter } from "next/router"
import { ArrowRight, Layers } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import Head from "next/head"

export default function Home() {
  const router = useRouter()
  return (
    <div className="relative flex h-screen  w-screen  items-center  px-4 md:px-20">
      <Head>
        <title>space &middot; repeat</title>
      </Head>
      <div className="absolute left-4 top-40 md:left-20 !text-2xl">
        <Logo />
      </div>
      <div className="flex  select-none flex-col space-y-4   text-lg font-medium text-primary md:flex-[2] md:text-2xl">
        <p>
          Revolutionize your study routine with{" "}
          <span className="font-bold underline underline-offset-4">
            space.repeat
          </span>
          .
        </p>
        <p>Create, organize, and master your flashcards effortlessly.</p>
        <p>Dominate your exams like a pro.</p>
        <Button
          onClick={() => router.push("/app")}
          className="flex items-center gap-1 self-stretch duration-500 md:self-start "
        >
          <p>Get Started </p>
          <ArrowRight className="h-5 w-5 animate-pulse" />
        </Button>
      </div>
      <HomePageFooter />
    </div>
  )
}

const HomePageFooter = () => (
  <div className="absolute bottom-10 left-1/2 -translate-x-[50%] w-full text-center">
    Made with ❤️ by Surya Ashish
  </div>
)
