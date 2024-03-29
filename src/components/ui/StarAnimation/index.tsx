import { FC } from "react"
import "./_animation.scss"

const StarAnimation: FC = () => {
  return (
    <div className='star-animation'>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
    </div>
  )
}

export default StarAnimation
