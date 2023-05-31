import type { AppType } from "next/app"
import { DM_Mono } from "next/font/google"

import "@/styles/globals.css"
import { QueryClient, QueryClientProvider } from "react-query"
import { RecoilRoot } from "recoil"

import { Toast, ToastProvider } from "@/components/ui/toast"
import { ThemeProvider } from "@/components/theme-provider"

export const font = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", ],
})

const client = new QueryClient()

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RecoilRoot>
        <ToastProvider>
          <QueryClientProvider client={client}>
            <div className={`${font.className} min-h-screen `}>
              <Component {...pageProps} />
              <Toast />
            </div>
          </QueryClientProvider>
        </ToastProvider>
      </RecoilRoot>
    </ThemeProvider>
  )
}

export default MyApp
