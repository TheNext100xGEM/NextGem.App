import { Analysed, Features, Hero, Scoring, Trade } from "@components/Home"
import { SITE_NAME } from "@constants/index"
import { useReveal } from "@hooks/useReveal"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useLocation, useNavigate } from "react-router-dom"

function HomePage() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const websiteVisited = localStorage.getItem("websiteVisited")

    const isInfosPage = location.pathname === "/infos"

    if (websiteVisited && !isInfosPage) {
      navigate("/gems")
    } else if (!websiteVisited && !isInfosPage) {
      localStorage.setItem("websiteVisited", "true")
    }
  }, [navigate, location.pathname])

  useReveal()

  return (
    <>
      <Helmet>
        <title>
          {SITE_NAME} — AI-Powered Insights for Smart Crypto Choices.
        </title>
      </Helmet>
      <div className='home'>
        <Hero />
        <Features />
        <Scoring />
        <Trade />
        <Analysed />
      </div>
    </>
  )
}

export default HomePage
