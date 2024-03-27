import { useWeb3React } from "@web3-react/core"
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
import Web3Token from "web3-token"

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

  const { provider, account } = useWeb3React()
  const hasCalledGetToken = useRef(false)

  useEffect(() => {
    const storedToken = Cookies.get("web3TokenAuth")

    if (storedToken) {
      setWeb3Token(storedToken)
    }
  }, [])

  useEffect(() => {
    if (!provider || hasCalledGetToken.current || web3Token || !account) {
      return
    }

    hasCalledGetToken.current = true
    const signer = provider.getSigner()

    const getToken = async () => {
      try {
        const token = await Web3Token.sign(async (msg: string) => {
          try {
            return await signer.signMessage(msg)
          } catch (err) {
            console.log(err)
          }
        }, "id")
        Cookies.set("web3TokenAuth", token, { expires: 1 })
        setWeb3Token(token)
      } catch (err) {
        console.log(err)
      }
    }

    getToken().catch(console.error)
  }, [provider, account, web3Token])

  useEffect(() => {
    const allowedPages = ["/gems", "/gem-ai", "/staking", "/analyze"]
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
