import "@assets/css/app.scss"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import React, { ReactNode } from "react"
import ReactDOM from "react-dom/client"
import Modal from "react-modal"

import App from "./App.tsx"
import { Web3ContextProvider } from "@components/Web3ContextProvider.tsx"

// Initialize libraries
gsap.registerPlugin(ScrollTrigger)
Modal.setAppElement("#root")

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Web3ContextProvider>
      <App />
    </Web3ContextProvider>
  </StrictMode>
)
