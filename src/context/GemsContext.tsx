import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
  useState
} from "react"
import { useSearchParams } from "react-router-dom"

// Defining the structure of the state used to filter gems
interface GemFilterState {
  id: string
  categories: string[]
  noteMin: number
  noteMax: number
  chains: string[]
  searchQuery?: string
  sortBy: string[]
  viewMode: "grid" | "list"
}

// Extending GemFilterState with setter functions for each state property
interface GemsContextProps extends GemFilterState {
  setId: Dispatch<SetStateAction<string>>
  setCategories: Dispatch<SetStateAction<string[]>>
  setNoteMin: Dispatch<SetStateAction<number>>
  setNoteMax: Dispatch<SetStateAction<number>>
  setChains: Dispatch<SetStateAction<string[]>>
  setSearchQuery: Dispatch<SetStateAction<string | undefined>>
  setSortBy: Dispatch<SetStateAction<string[]>>
  setViewMode: Dispatch<SetStateAction<"grid" | "list">>
}

// Function to serialize state into human readable URL search parameters for persistence
const serialize = (state: GemFilterState) => {
  const params = new URLSearchParams()

  if (state.id !== "") {
    params.set("id", state.id)
  }
  if (state.categories.length > 0) {
    params.set("categories", state.categories.join(",")) // Comma-separated list
  }
  // Ensuring noteMin and noteMax are within an acceptable range before setting
  params.set(
    "noteMin",
    state.noteMin >= 0 && state.noteMin <= 10 ? state.noteMin.toString() : "1"
  )
  params.set(
    "noteMax",
    state.noteMax >= 0 && state.noteMax <= 10 ? state.noteMax.toString() : "10"
  )
  if (state.chains.length > 0) {
    params.set("chains", state.chains.join(","))
  }
  if (state.searchQuery) {
    params.set("searchQuery", state.searchQuery)
  }
  if (state.sortBy.length > 0) {
    params.set("sortBy", state.sortBy.join(","))
  }
  params.set("viewMode", state.viewMode)
  return params
}

// Function to parse URL search parameters back into state
const parse = (params: URLSearchParams) => {
  return {
    id: params.get("id") || "",
    categories: params.get("categories")?.split(",") || [],
    noteMin: Number(params.get("noteMin")) || 1,
    noteMax: Number(params.get("noteMax")) || 10,
    chains: params.get("chains")?.split(",") || [],
    searchQuery: params.get("searchQuery") || undefined,
    sortBy: params.get("sortBy")?.split(",") || [],
    viewMode: (params.get("viewMode") as GemFilterState["viewMode"]) || "grid"
  }
}

const GemsContext = createContext<GemsContextProps | undefined>(undefined)

export const GemsContextProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialState = parse(searchParams)

  // State hooks for each filter criterion
  const [id, setId] = useState(initialState.id)
  const [categories, setCategories] = useState(initialState.categories)
  const [noteMin, setNoteMin] = useState(initialState.noteMin)
  const [noteMax, setNoteMax] = useState(initialState.noteMax)
  const [chains, setChains] = useState(initialState.chains)
  const [searchQuery, setSearchQuery] = useState(initialState.searchQuery)
  const [sortBy, setSortBy] = useState(initialState.sortBy)
  const [viewMode, setViewMode] = useState(initialState.viewMode)

  // Effect hook to update URL search parameters whenever the state changes
  useEffect(() => {
    const newState = {
      id,
      categories,
      noteMin,
      noteMax,
      chains,
      searchQuery,
      sortBy,
      viewMode
    }
    const params = serialize(newState)
    setSearchParams(params, { replace: true })
  }, [
    id,
    categories,
    noteMin,
    noteMax,
    chains,
    searchQuery,
    sortBy,
    viewMode,
    setSearchParams
  ])

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
        setSortBy,
        viewMode,
        setViewMode
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
