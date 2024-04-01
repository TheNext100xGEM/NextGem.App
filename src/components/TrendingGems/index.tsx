import "./_trendinggems.scss"
import React from "react"
import Marquee from "react-fast-marquee"
import { Link } from "react-router-dom"

interface TrendingGemsProps {
  items: TrendingGems
}

type TrendingGems = {
  name: string
  projectId: string
}[]

export const TrendingGems: React.FC<TrendingGemsProps> = ({ items }) => {

  return (
    <Marquee speed={60} gradient={false} className="scroller" pauseOnHover={true}>
      {items.map((gem, i) => (
          <Link to={`/gems/${gem.projectId}`} className='card' key={`trending-gem-${i}`}>
            <span className="number">#{i + 1}</span>
            <span>{gem.name}</span>
          </Link>
      ))}
    </Marquee>
  )
}
