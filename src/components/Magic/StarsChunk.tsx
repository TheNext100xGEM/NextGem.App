import "./_star.scss"
import Star from "./Star.jsx"

import { StarType } from "./index.js"

export default function StarsChunk({ stars }: { stars: StarType[] }) {
  return stars.map((x: StarType) => {
    return <Star starObject={x} key={x.id} />
  })
}
