import Footer from '@components/Footer'
import Header from '@components/Header'
import { TOAST_DURATION } from '@constants/index'
import { AppContextProvider } from '@context/AppContext'
import useWindowHeight from '@hooks/useWindowHeight'
import { GemsPage, StakingPage, GemAiPage } from '@pages/App'
import { HomePage, DefaultPage } from '@pages/index'
import { HelmetProvider } from "react-helmet-async"
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from 'react-router-dom'

function App() {
  useWindowHeight()

  const Container = (
    <HelmetProvider>
      <AppContextProvider>
        <Header />
        <main className="main">
          <Outlet />
        </main>
        <Footer />
        <div className="main-h" />
        <div className="main-v" />
        <Toaster
          position="bottom-right"
          gutter={8}
          containerStyle={{
            inset: 'var(--main-padding)'
          }}
          containerClassName="toast-ct"
          toastOptions={{
            duration: TOAST_DURATION,
            className: 'toast',
            style: {
              border: 'var(--stroke-primary)',
              borderRadius: 0,
              backgroundColor: 'rgba(var(--bg-body-rgb) / 0.7)'
            },
            success: {
              iconTheme: {
                primary: 'hsl(var(--color-success-h), var(--color-status-s), var(--color-l-1))',
                secondary: 'var(--bg-body)',
              }
            },
            error: {
              iconTheme: {
                primary: 'hsl(var(--color-danger-h), var(--color-status-s), var(--color-l-1))',
                secondary: 'var(--bg-body)',
              }
            }
          }}
        />
        <ScrollRestoration />
      </AppContextProvider>
    </HelmetProvider>
  )

  const router = createBrowserRouter([
    {
      element: Container,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/gems',
          element: <GemsPage />
        },
        {
          path: '/staking',
          element: <StakingPage />
        },
        {
          path: '/gem-ai',
          element: <GemAiPage />
        },
        {
          path: '/default',
          element: <DefaultPage />
        },
        {
          path: '*',
          element: <HomePage />
        }
      ],
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App