import type { AppType } from "next/app"
import { Inter } from "next/font/google"

import "@/styles/globals.css"
import { RecoilRoot } from "recoil"

import { Toast, ToastProvider } from "@/components/ui/toast"
import { ThemeProvider } from "@/components/theme-provider"

const font = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RecoilRoot>
        <ToastProvider>
          <div className={`${font.className} min-h-screen `}>
            <Component {...pageProps} />
            <Toast />
          </div>
        </ToastProvider>
      </RecoilRoot>
    </ThemeProvider>
  )
}

export default MyApp
