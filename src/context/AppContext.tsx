import { useWeb3React } from "@web3-react/core"
import Cookies from "js-cookie"
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from "react"
import { useLocation } from "react-router-dom"
import { Web3Provider } from "@ethersproject/providers"
import axios from "axios"
import { APP_API_URL } from "../libs/constants"

interface AppContextProps {
  isInApp: boolean
  setIsInApp: React.Dispatch<React.SetStateAction<boolean>>
  isInChat: boolean
  setIsInChat: React.Dispatch<React.SetStateAction<boolean>>
  isPremium: boolean | null
  setIsPremium: React.Dispatch<React.SetStateAction<boolean | null>>
  web3Token: string | null
  setWeb3Token: React.Dispatch<React.SetStateAction<string | null>>
  loginWithWallet: () => Promise<void>
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isInApp, setIsInApp] = useState(false)
  const [isInChat, setIsInChat] = useState(false)
  const [isPremium, setIsPremium] = useState<boolean | null>(null)
  const [web3Token, setWeb3Token] = useState<string | null>(null)
  const location = useLocation()

  // Use the Web3Provider type in useWeb3React
  const { account, provider } = useWeb3React<Web3Provider>()

  // Load stored token from cookies on component mount
  useEffect(() => {
    const storedToken = Cookies.get("web3AuthToken")
    if (storedToken) {
      setWeb3Token(storedToken)
    }
  }, [])

  // Login with wallet and send request to backend
  const loginWithWallet = async () => {
    if (!provider || !account) return

    try {
      const signer = provider.getSigner()
      const message = "Please sign this message to log in to NextGem."

      // Sign the message
      const signature = await signer.signMessage(message)

      // Send login request to backend
      const response = await axios.post(`${APP_API_URL}/auth/wallet`, {
        address: account,
        signature
      })

      // If login is successful, store the token and update state
      if (response.data.token) {
        Cookies.set("web3AuthToken", response.data.token, { expires: 1 })
        setWeb3Token(response.data.token)
        console.log("Login successful, token received:", response.data.token)
      } else {
        console.error("Login failed, no token received.")
      }
    } catch (error) {
      console.error("Error during login with wallet:", error)
    }
  }

  // Handle account disconnection
  useEffect(() => {
    if (!provider) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setWeb3Token(null)
        Cookies.remove("web3AuthToken")
        console.log("Disconnected from wallet")
      }
    }

    provider.on("accountsChanged", handleAccountsChanged)

    return () => {
      provider.removeListener("accountsChanged", handleAccountsChanged)
    }
  }, [provider])

  // Detect location changes and update in-app and chat states
  useEffect(() => {
    const allowedPages = [
      "/portal",
      "/gems",
      "/gem-ai",
      "/premium",
      "/analyze",
      "/staking"
    ]
    const isInApp = allowedPages.some((page) =>
      location.pathname.startsWith(page)
    )
    setIsInApp(isInApp)

    setIsInChat(location.pathname.includes("/gem-ai"))
  }, [location.pathname])

  return (
    <AppContext.Provider
      value={{
        isInApp,
        setIsInApp,
        isInChat,
        setIsInChat,
        web3Token,
        setWeb3Token,
        isPremium,
        setIsPremium,
        loginWithWallet
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider")
  }

  return context
}
