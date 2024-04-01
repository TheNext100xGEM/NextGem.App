import classNames from "classnames"
import { FC } from "react"
import "./_animation.scss"

interface PropsStarAnimation {
  isChatPage?: boolean
}

const StarAnimation: FC = ({ isChatPage = false }: PropsStarAnimation) => {
  return (
    <div
      className={classNames("star-animation", {
        ischat: isChatPage
      })}
    >
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
    </div>
  )
}

export default StarAnimation
