import Head from "next/head"

import { SocialLoginButton } from "@/components/SocialLoginButton"

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Head>
        <title>Login &middot; space.repeat</title>
      </Head>
      <div className="flex flex-col md:border p-8 w-full sm:w-4/5 md:w-2/5 gap-5">
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold tracking-tighter text-center">
          Login for a new revolution<br></br>in your{" "}
          <span className="text-green-500">memory game</span>.
        </h1>
        <p className="text-center text-muted-foreground">
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
