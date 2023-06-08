import Head from "next/head"

import { SocialLoginButton } from "@/components/SocialLoginButton"
import { Logo } from "@/components/logo"

const LoginPage = () => {
  return (
    <div className="bg- flex min-h-screen items-center justify-center lg:bg-[url('/login-background.svg')]  bg-no-repeat bg-cover">
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
        <p className="text-muted-foreground text-center">
          You can login with any of the social media provider.
        </p>
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
