import { useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { toast } from "react-hot-toast"

import { SocialLoginButton } from "@/components/SocialLoginButton"
import { Logo } from "@/components/logo"

const LoginPage = () => {
  const router = useRouter()
  const { error } = router.query

  useEffect(() => {
    if (error) {
      toast.error("Not able to login, please try again.")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bg- flex min-h-screen items-center justify-center bg-cover  bg-no-repeat lg:bg-[url('/login-background.svg')]">
      <Head>
        <title>Login &middot; space.repeat</title>
      </Head>
      <div className="flex w-full   flex-col gap-5 p-8 sm:w-4/5 md:w-2/5">
        <div className="self-center">
          <Logo />
        </div>
        <h1 className="text-center text-xl font-bold tracking-tighter sm:text-2xl lg:text-4xl">
          Login for a revolution<br></br>in your{" "}
          <span className="text-primary">memory game</span>.
        </h1>

        <SocialLoginButton provider="google">
          Sign in with Google
        </SocialLoginButton>
        <SocialLoginButton provider="facebook">
          Sign in with Facebook
        </SocialLoginButton>
        <SocialLoginButton provider="github">
          Sign in with Github
        </SocialLoginButton>
      </div>
    </div>
  )
}

export default LoginPage
