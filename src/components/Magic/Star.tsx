import { StarType } from "."
import "./_star.scss"

export default function Star({ starObject }: { starObject: StarType }) {
  const styles = {
    transform: `translate(${starObject.xOffset}px, ${starObject.yOffset}px) rotate(${starObject.rotation}deg) scale(${starObject.scale})`,
    opacity: starObject.opacity
  }

  return (
    <div>
      <div style={styles} className='star' />
    </div>
  )
}
