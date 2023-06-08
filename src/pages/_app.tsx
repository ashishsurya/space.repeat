import type { AppType } from "next/app"
import { DM_Mono } from "next/font/google"

import "@/styles/globals.css"
import { Toaster } from "react-hot-toast"
import { QueryClient, QueryClientProvider } from "react-query"
import { RecoilRoot } from "recoil"

import { ThemeProvider } from "@/components/theme-provider"

export const font = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
})

const client = new QueryClient({
  defaultOptions: {
    queries: {},
  },
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RecoilRoot>
        <QueryClientProvider client={client}>
          <div className={`${font.className} min-h-screen `}>
            <Toaster position="top-center" />
            <Component {...pageProps} />
          </div>
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  )
}

export default MyApp
