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
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isInApp, setIsInApp] = useState<boolean>(false)
  const location = useLocation()

  const { provider } = useWeb3React()
  const hasCalledGetToken = useRef(false)

  useEffect(() => {
    const web3Token = Cookies.get('web3TokenAuth');

    if (!provider || hasCalledGetToken.current || web3Token) {
      return
    }

    hasCalledGetToken.current = true

    const getToken = async () => {
      const token = await Web3Token.sign(
        (msg: string) => provider.getSigner().signMessage(msg),
        {
          domain: 'thenextgem.ai',
          expires_in: '1 day'
        }
      )
      Cookies.set("web3TokenAuth", token, { expires: 1 })
    }

    getToken().catch(console.error)
  }, [provider])

  useEffect(() => {
    const allowedPages = ["/gems", "/gem-ai", "/staking"]
    const isInApp = allowedPages.some(page => location.pathname.startsWith(page));
    setIsInApp(isInApp);
  }, [location.pathname])

  return (
    <AppContext.Provider value={{ isInApp, setIsInApp }}>
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
