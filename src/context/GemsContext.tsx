import React, { createContext, useContext, useState, ReactNode } from "react"

interface GemsContextProps {
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

const GemsContext = createContext<GemsContextProps | undefined>(undefined)

export const GemsContextProvider = ({ children }: { children: ReactNode }) => {
  const [id, setId] = useState<GemsContextProps["id"]>("")
  const [categories, setCategories] =
    useState<GemsContextProps["categories"]>([])
  const [noteMin, setNoteMin] = useState<GemsContextProps["noteMin"]>(1)
  const [noteMax, setNoteMax] = useState<GemsContextProps["noteMax"]>(10)
  const [chains, setChains] = useState<GemsContextProps["chains"]>([])
  const [searchQuery, setSearchQuery] =
    useState<GemsContextProps["searchQuery"]>(undefined)
    const [sortBy, setSortBy] = useState<GemsContextProps["chains"]>([])

  return (
    <GemsContext.Provider
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
    </GemsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGemsContext = () => {
  const context = useContext(GemsContext)

  if (!context) {
    throw new Error("useGemsContext must be used within an GemsContextProvider")
  }

  return context
}
