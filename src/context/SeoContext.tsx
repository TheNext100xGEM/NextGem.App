import { createContext, useContext, ReactNode } from "react"
import { Helmet } from "react-helmet-async"

interface SeoContextProps {}

const SeoContext = createContext<SeoContextProps | undefined>(undefined)

export const SeoContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SeoContext.Provider value={{}}>
      <Helmet>
        <link rel='canonical' href={window.location.href} />
        <meta
          name='description'
          content="Leveraging the most powerful artificial intelligence, we track and analyze crypto projects, making it easy for you to spot the next big success, let's find together the next gems."
        />
        <meta property="og:url" content={window.location.href} />
        <meta
          name='og:description'
          content="Leveraging the most powerful artificial intelligence, we track and analyze crypto projects, making it easy for you to spot the next big success, let's find together the next gems."
        />
      </Helmet>
      {children}
    </SeoContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSeoContext = () => {
  const context = useContext(SeoContext)

  if (!context) {
    throw new Error("useSeoContext must be used within an SeoContextProvider")
  }

  return context
}
