import React, { createContext, useContext, useState, ReactNode } from "react"

interface GemContextProps {
  id: string
  setId: React.Dispatch<React.SetStateAction<string>>
}

const GemContext = createContext<GemContextProps | undefined>(undefined)

export const GemContextProvider = ({ children }: { children: ReactNode }) => {
  const [id, setId] = useState<GemContextProps["id"]>("")

  return (
    <GemContext.Provider value={{ id, setId }}>{children}</GemContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGemContext = () => {
  const context = useContext(GemContext)

  if (!context) {
    throw new Error("useGemContext must be used within an GemContextProvider")
  }

  return context
}
