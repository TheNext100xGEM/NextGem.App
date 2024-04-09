import "@assets/css/app.scss"
import { Buffer } from "buffer"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import React, { ReactNode } from "react"
import ReactDOM from "react-dom/client"
import Modal from "react-modal"
import { WagmiProvider } from "wagmi"

import App from "./App.tsx"
import { config } from "./libs/config.ts"

// Initialize libraries
gsap.registerPlugin(ScrollTrigger)
Modal.setAppElement("#root")

globalThis.Buffer = Buffer

// Enable or disable React.StrictMode
// eslint-disable-next-line react-refresh/only-export-components
const StrictModeEnabled = false
// eslint-disable-next-line react-refresh/only-export-components
const StrictMode = ({ children }: { children: ReactNode }) => {
  return StrictModeEnabled ? (
    <React.StrictMode>{children}</React.StrictMode>
  ) : (
    <>{children}</>
  )
}

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
)
