import { Analysed, Features, Hero, Scoring, Trade } from "@components/Home"
import { SITE_NAME } from "@constants/index"
import { useGSAP } from "@gsap/react"
import { useReveal } from "@hooks/useReveal"
import gsap from "gsap"
import { useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useLocation, useNavigate } from "react-router-dom"
import "./_home.scss"

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

  useGSAP(() => {
    gsap.fromTo(
      ".home .scroll",
      { opacity: 1, y: "0%" },
      {
        opacity: 0,
        y: "100%",
        scrollTrigger: {
          trigger: ".home .features",
          start: "top bottom",
          end: "top 50%",
          scrub: true
        }
      }
    )
  })

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
        <div className='scroll'>
          <span>Scroll to explore</span>
          <div className='l'></div>
        </div>
      </div>
    </>
  )
}

export default HomePage
