import { ApiGem } from "@models/GemCard"
import "./_trendinggems.scss"
import React from "react"
import Marquee from "react-fast-marquee"
import { Link } from "react-router-dom"

interface TrendingGemsProps {
  gems: ApiGem[]
}

export const TrendingGems: React.FC<TrendingGemsProps> = ({ gems }) => {
  return (
    <Marquee
      speed={60}
      gradient={false}
      className='scroller'
      pauseOnHover={true}
    >
      {gems.map((gem, i) => (
        <Link
          to={`/gems/${gem.id}`}
          className='card'
          key={`trending-gem-${gem.id}`}
          title={gem?.name}
        >
          <span className='number'>#{i + 1}</span>
          <span>{gem.name}</span>
        </Link>
      ))}
    </Marquee>
  )
}

export const Announcement: React.FC = () => {
  return (
    <Marquee
      speed={50}
      gradient={false}
      className='scroller'
      pauseOnHover={true}
      style={{zIndex:5000}}
    >
       
        <Link
          to={`/staking`}
          className='card'
          title={'Staking'}
        >
          <span>{'Staking is live'}</span>
        </Link>
    </Marquee>
  )
}
