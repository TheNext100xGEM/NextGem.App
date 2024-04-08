import Cookies from "js-cookie"
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef
} from "react"
import { useLocation } from "react-router-dom"
import { useAccount, useSignMessage, useChainId } from "wagmi"

interface AppContextProps {
  isInApp: boolean
  setIsInApp: React.Dispatch<React.SetStateAction<boolean>>
  isInChat: boolean
  setIsInChat: React.Dispatch<React.SetStateAction<boolean>>
  isPremium: boolean | null
  setIsPremium: React.Dispatch<React.SetStateAction<boolean | null>>
  web3Token: string | null
  setWeb3Token: React.Dispatch<React.SetStateAction<string | null>>
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isInApp, setIsInApp] = useState<AppContextProps["isInApp"]>(false)
  const [isInChat, setIsInChat] = useState<AppContextProps["isInChat"]>(false)
  const [isPremium, setIsPremium] = useState<AppContextProps["isPremium"]>(null)
  const [web3Token, setWeb3Token] = useState<AppContextProps["web3Token"]>(null)
  const location = useLocation()

  const hasCalledGetToken = useRef(false)
  const chainId = useChainId()
  const { address: account } = useAccount()
  const { data: signMessageData, signMessageAsync } = useSignMessage()

  useEffect(() => {
    const storedToken = Cookies.get("web3TokenAuth")

    if (storedToken) {
      setWeb3Token(storedToken)
    }
  }, [])

  useEffect(() => {
    if (hasCalledGetToken.current || web3Token || !account || signMessageData) {
      return
    }

    const message = `thenextgem.ai wants you to sign in with your Ethereum account.

Web3 Token Version: 2
Chain ID: ${chainId}
Nonce: 58935454
Issued At: ${new Date().toISOString()}
Expiration Time: ${new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toISOString()}
Request ID: 12345`

    const getToken = async () => {
      hasCalledGetToken.current = true

      try {
        const token = await signMessageAsync({
          message: message,
          account
        })
        Cookies.set("web3TokenAuth", token, { expires: 1 })
        setWeb3Token(token)
      } catch (error) {
        console.error(error)
      }
    }

    getToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, signMessageData, web3Token])

  useEffect(() => {
    const allowedPages = ["/portal", "/gems", "/gem-ai", "/staking", "/analyze"]
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
        setIsPremium
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
