import Footer from "@components/Footer"
import Header from "@components/Header"
import { TOAST_DURATION } from "@constants/index"
import { AppContextProvider } from "@context/AppContext"
import { ChatContextProvider } from "@context/ChatContext"
import { GemsContextProvider } from "@context/GemsContext"
import { SeoContextProvider } from "@context/SeoContext"
import useWindowHeight from "@hooks/useWindowHeight"
import AiAnalysisPage from '@pages/AiAnalysis'
import { GemsPage, StakingPage, GemAiPage } from "@pages/App"
import GemAiSinglePage from "@pages/App/GemAiSingle"
import GemDetailPage from "@pages/App/GemDetail"
import GemsPortal from "@pages/App/GemsPortal"
import { HomePage, DefaultPage } from "@pages/index"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { HelmetProvider } from "react-helmet-async"
import { Toaster } from "react-hot-toast"
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom"

function App() {
  useWindowHeight()

  const queryClient = new QueryClient()

  const Container = (
    <HelmetProvider>
      <AppContextProvider>
        <SeoContextProvider>
          <ChatContextProvider>
            <QueryClientProvider client={queryClient}>
              <Header />
              <main className='main'>
                <Outlet />
              </main>
              <Footer />
              <div className='main-h' />
              <div className='main-v' />
              <Toaster
                position='bottom-right'
                gutter={8}
                containerStyle={{
                  inset: "var(--main-padding)"
                }}
                containerClassName='toast-ct'
                toastOptions={{
                  duration: TOAST_DURATION,
                  className: "toast",
                  style: {
                    border: "var(--stroke-primary)",
                    borderRadius: 0,
                    backgroundColor: "rgba(var(--bg-body-rgb) / 0.7)"
                  },
                  success: {
                    iconTheme: {
                      primary:
                        "hsl(var(--color-success-h), var(--color-status-s), var(--color-l-1))",
                      secondary: "var(--bg-body)"
                    }
                  },
                  error: {
                    iconTheme: {
                      primary:
                        "hsl(var(--color-danger-h), var(--color-status-s), var(--color-l-1))",
                      secondary: "var(--bg-body)"
                    }
                  }
                }}
              />
              <ScrollRestoration />
            </QueryClientProvider>
          </ChatContextProvider>
        </SeoContextProvider>
      </AppContextProvider>
    </HelmetProvider>
  )

  const router = createBrowserRouter([
    {
      element: Container,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/infos",
          element: <HomePage />
        },
        {
          path: "/portal",
          element: <GemsPortal />
        },
        {
          path: "/gems",
          element: (
            <GemsContextProvider>
              <GemsPage />
            </GemsContextProvider>
          )
        },
        {
          path: "/gems/:tokenId",
          element: <GemDetailPage />
        },
        {
          path: "/staking",
          element: <StakingPage />
        },
        {
            path: "/analyze",
            element: <AiAnalysisPage />
        },
        {
          path: "/gem-ai/:chatId",
          element: <GemAiSinglePage />
        },
        {
          path: "/gem-ai",
          element: <GemAiPage />
        },
        {
          path: "/default",
          element: <DefaultPage />
        },
        {
          path: "*",
          element: (
            <GemsContextProvider>
              <GemsPage />
            </GemsContextProvider>
          )
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
