import React, { createContext, useContext, useState, ReactNode } from "react"

interface GemContextProps {
  id: string
  setId: React.Dispatch<React.SetStateAction<string>>
  categories: string[]
  setCategories: React.Dispatch<React.SetStateAction<string[]>>
  noteMin: number
  setNoteMin: React.Dispatch<React.SetStateAction<number>>
  noteMax: number
  setNoteMax: React.Dispatch<React.SetStateAction<number>>
  chains: string[]
  setChains: React.Dispatch<React.SetStateAction<string[]>>
  searchQuery: string | undefined
  setSearchQuery: React.Dispatch<React.SetStateAction<string | undefined>>
  sortBy: string[]
  setSortBy: React.Dispatch<React.SetStateAction<string[]>>
}

const GemContext = createContext<GemContextProps | undefined>(undefined)

export const GemContextProvider = ({ children }: { children: ReactNode }) => {
  const [id, setId] = useState<GemContextProps["id"]>("")
  const [categories, setCategories] =
    useState<GemContextProps["categories"]>([])
  const [noteMin, setNoteMin] = useState<GemContextProps["noteMin"]>(1)
  const [noteMax, setNoteMax] = useState<GemContextProps["noteMax"]>(10)
  const [chains, setChains] = useState<GemContextProps["chains"]>([])
  const [searchQuery, setSearchQuery] =
    useState<GemContextProps["searchQuery"]>(undefined)
    const [sortBy, setSortBy] = useState<GemContextProps["chains"]>([])

  return (
    <GemContext.Provider
      value={{
        id,
        setId,
        categories,
        setCategories,
        noteMin,
        setNoteMin,
        noteMax,
        setNoteMax,
        chains,
        setChains,
        searchQuery,
        setSearchQuery,
        sortBy, 
        setSortBy
      }}
    >
      {children}
    </GemContext.Provider>
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
