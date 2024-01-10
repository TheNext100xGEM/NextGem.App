import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from "react"
import { useLocation } from "react-router-dom"

interface AppContextProps {
  isInApp: boolean
  setIsInApp: React.Dispatch<React.SetStateAction<boolean>>
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isInApp, setIsInApp] = useState<boolean>(false)
  const location = useLocation()

  useEffect(() => {
    const allowedPages = ["/", "/gem-ai", "/staking"]
    setIsInApp(allowedPages.includes(location.pathname))
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
